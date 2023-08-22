const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const routes = require('./app/route/todo.route')
const server = express()
const port = 8023


server.use(cors())
server.use(express.json())
server.use(routes)
const dbURL = 'mongodb+srv://okeayodejia:123456ASD@cluster0.6c7xhsz.mongodb.net/?retryWrites=true&w=majority'
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