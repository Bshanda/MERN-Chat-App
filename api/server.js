import express from 'express'
import { createServer } from 'http'

import dotenv from 'dotenv'
import apiRouter from './src/routes/api.js'
import initDb from './src/db/initDb.js'
import Paths from './src/constants/Paths.js'
import cookieParser from 'cookie-parser'
import EnvVars from './src/constants/EnvVars.js'
import cors from 'cors'

import { app, io, server } from './src/socket/socket.js'

dotenv.config()
const PORT = EnvVars.Port || 8000

app.use(cors()) // Enable CORS for all routes

app.use(express.json()) // for parsing the json objects
app.use(cookieParser()) // Parsing the cookies
app.use(Paths.Base, apiRouter) // using the router

server.listen(PORT, () => {
  console.log(`Server running at ${PORT}`)
  initDb()
  // socket io.

  io.on('connection', socket => {
    console.log('New user connected', socket.id)

    // listen for messages
    socket.on('message', msg => {
      if (msg) {
        console.log('New message sent by user', msg)
      }
    })

    // On user disconnect
    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id)
    })
  })
})
