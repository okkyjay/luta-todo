const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./app/route/todo.route')
const configEnv = require('./app/config/index.config') 
const server = express()
const port = 8023


server.use(cors())
server.use(express.json())
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Content-Type', 'application/json')
  if(res.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Mehtod', 'POST, GET, PUT, DELETE, PATCH, HEAD')
  }
  next()
})
server.use(routes)
const dbURL = configEnv.db_url
  try {
    mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })

    const connection = mongoose.connection
    connection.once('open', (error, db) => {
      if(error){
          console.log('Error connecitng to db')
      }else{
          console.log('Connection Successful')
      }
    })
  } catch (error) {
    console.log(error)
  }
server.listen(port, () => {
    console.log('Connected ' + port)
})