import { Server } from 'socket.io'
import http from 'http'
import express, { json } from 'express'
import EnvVars from '../constants/EnvVars.js'
import { createClient } from 'redis'

const app = express()
const server = http.createServer(app)

// initalise redis connection.
// const redisClient = connectToRedis()
const redis = createClient()

redis.on('error', err => {
  console.log('Error in connecting to redis server', err)
})

redis.on('connect', () => {
  console.log('Connected to redis...')
})

redis.on('disconnect', async () => {
  console.log('Redis client disconnected.')
})

await redis.connect()

// socket.io setup

const io = new Server(server, {
  cors: {
    origin: [EnvVars.SockerServerOrigin],
    methods: ['GET', 'POST']
  }
})

export const getUserSocketId = async userId => {
  let userSocketIds = await redis.hGet('onlineUsers', `${userId}`)
  userSocketIds = JSON.parse(userSocketIds)

  return userSocketIds
}

const userSocketMap = {} // {userId:[socketId]}

io.on('connection', async socket => {
  console.log('A user connected:-', socket.id)
  const userId = socket.handshake.query.userId

  if (userId != undefined) {
    // add user in cache
    async function addUser () {
      try {
        let existingSocketIds = await redis.hGet('onlineUsers', `${userId}`)
        let userSocketIds = []
        // If user not loggedIn from another client.
        if (!existingSocketIds) {
          // userSocketMap[userId] = socket.id // userSocketMap = {userId: [socketId]}
          //push the current user to array.
          userSocketIds.push(socket.id) // userId:['socketid1','socketid2',...]

          // stringify for saving in cache memory
          userSocketIds = JSON.stringify(userSocketIds)

          // save to redis for caching.
          const res = await redis.hSet(
            'onlineUsers',
            `${userId}`,
            userSocketIds
          )
          // console.log('user connected first time cache :-', res)
        }
        // if user has logged in from another client. Add this socket to existing socket's array.
        else {
          existingSocketIds = JSON.parse(existingSocketIds)
          let userSocketIds = [...existingSocketIds, socket.id]
          userSocketIds = JSON.stringify(userSocketIds)
          const res = await redis.hSet(
            'onlineUsers',
            `${userId}`,
            userSocketIds
          )
          // console.log('User connected more than one time:-', res)
        }
      } catch (error) {
        console.log('Error in adding user to onlineUser.', error)
        return
      }
      return
    }

    await addUser()
  }

  // get online users Id's. Asynchronously.
  function getOnlineUsersIdsFromRedisCache () {
    return new Promise((resolve, reject) => {
      // Simulating asynchronous operation

      redis
        .hKeys('onlineUsers', () => {})
        .then(data => {
          if (!data) {
            resolve(null)
          }
          // console.log('fecthed data', data)
          resolve(data)
        })
        .catch(e => {
          console.log('Error in get Online users', e.message)
          reject('Error in get online users', e.message)
        })
    })
  }

  // Emiiting online users to clients.
  async function emitDataToClients () {
    // Wait for the data to be retrieved from the database
    getOnlineUsersIdsFromRedisCache()
      .then(data => {
        // Emit the data to all clients using io.emit
        io.emit('getOnlineUsers', data)
      })
      .catch(e => {
        console.error('Error fetching data:', error)
      })
  }

  //call the socket emit event function.
  emitDataToClients()

  // socket.on() is used to listen to the events. can be used both on client and server side
  socket.on('disconnect', async () => {
    console.log('User disconnected ', socket.id)

    if (!redis) {
      console.log('not connected to redis')
      return
    }
    try {
      let userSocketIds = await redis.hGet('onlineUsers', `${userId}`)
      userSocketIds = JSON.parse(userSocketIds)
      console.log('User socket ids', userSocketIds?.length)
      // for error handling in development.
      if (userSocketIds?.length === 0) {
        return
      }
      // delete the userId from redis cache if user this last online instance of user.
      if (userSocketIds?.length == 1) {
        console.log('This user has one instance')
        redis
          .hDel('onlineUsers', `${userId}`)
          .then(() => {
            // console.log('Logged out user:-', socket.id)
            emitDataToClients()
              .then(() => {
                return
              })
              .catch(e => {
                console.log(e.message)
                return
              })
            return
          })
          .catch(e => {
            console.log(
              'Error in deleting logout user from redis cache',
              e.message
            )
            return
          })
        return
      }
      // this block runs if user has more than one instance running.
      else {
        // console.log('This user has more than one instances');
        redis.hDel('onlineUsers', userId).then(() => {
          try {
            const indexOfSocket = userSocketIds.indexOf(socket.id)
            // removes this instance of user from socketMap.
            userSocketIds.splice(indexOfSocket, 1)
            const stringifiedData = JSON.stringify(userSocketIds)
            redis.hSet('onlineUsers', userId, stringifiedData)
            emitDataToClients()
          } catch (error) {
            console.log('Error in ')
          }
        })
      }
      // for (let i = 0; i < userSocketIds.length; i++) {
      //   const element = userSocketIds[i]
      //   if (element == socket.id) {
      //     console.log('Element matched at', i)
      //     const isRemoved = userSocketIds.slice(i, 1)
      //     console.log('Socket id removed:-', isRemoved)
      //     break
      //   }
      // }
      // await redis.hDel('onlineUsers', `${userId}`)
    } catch (error) {
      console.log('Error in socket disconnect event', error.message)
    }
  })
})

export { io, app, server, redis }
