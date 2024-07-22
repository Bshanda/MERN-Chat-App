// import { createClient } from 'redis'

// // funtion for connecting to redis.
// const connectToRedis = async () => {
//   // await client.onconst
//   const client = createClient({
//     host: 'localhost', // Redis server hostname
//     port: 6379, // Redis server port
//     connect_timeout: 5000 // Timeout in milliseconds (5 seconds)
//     // Add other options here as needed
//   })

//   // connect asynchronusly
//   const connectSync = () => {
//     return new Promise((resolve, reject) => {
//       console.log('connecting to redis')
//       client.on('connect', () => {
//         console.log('Connected to redis client', client)
//         resolve(client)
//       })

//       client.on('error', err => {
//         console.log('Error in connecting to client', err)
//         reject(err)
//       })
//     })
//   }

//   try {
//     // wait for connection to be made.
//     await connectSync()
//     return client // return the redis client.
//   } catch (error) {
//     throw error
//   }
// }

// export default connectToRedis

import redis from 'redis'

// Function to connect to Redis with a timeout
function connectToRedis () {
  // Create a Redis client with a specified timeout
  const client = redis.createClient({
    host: 'localhost', // Redis server hostname
    port: 6379, // Redis server port
    connect_timeout: 5000 // Timeout in milliseconds (5 seconds)
    // Add other options here as needed
  })

  if (client ) {
    console.log('Express app connected to redis server');
  }

  // Promisify the client's connect method
  // const connectAsync = () => {
  //   return new Promise((resolve, reject) => {
  //     client.on('connect', () => {
  //       console.log('Connected to Redis')
  //       resolve(client)
  //     })

  //     client.on('error', err => {
  //       console.error('Error connecting to Redis:', err)
  //       reject(err)
  //     })
  //   })
  // }

  // try {
    // Wait for the connection to be established
    // await connectAsync()
    // return client // Return the Redis client instance
  // } catch (error) {
    // Handle connection errors
    // throw error}
    return client
  }


export default connectToRedis

// // Usage
// connectToRedis()
//   .then(redisClient => {
//     // Use the connected redisClient here
//     console.log('Redis client:', redisClient)
//     // Example usage:
//     redisClient.set('myKey', 'myValue', redis.print)
//     redisClient.get('myKey', (err, result) => {
//       if (err) {
//         console.error('Error retrieving value from Redis:', err)
//       } else {
//         console.log('Value retrieved from Redis:', result)
//       }
//     })
//   })
//   .catch(error => {
//     console.error('Error in Redis connection:', error)
//   })
