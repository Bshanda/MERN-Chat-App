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
import path from 'path'

dotenv.config()
const PORT = EnvVars.Port || 8000
const __dirname = path.resolve()

app.use(cors()) // Enable CORS for all routes

// Logging middleware
// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`)
//   next() // Call the next middleware or route handler
// })

app.use(express.json()) // for parsing the json objects
app.use(cookieParser()) // Parsing the cookies
app.use(Paths.Base, apiRouter) // using the router

// serving stati files.
app.get(express.static(path.join(__dirname, '../client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'dist', 'index.html'))
})

server.listen(4080, async () => {
  console.log(`Server running at ${PORT}`)
  initDb() 
})
