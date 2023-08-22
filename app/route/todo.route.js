const express = require('express')
const router = express.Router()
const todoController = require('../contoller/todo.controller')
const authController = require('../contoller/auth.controller')

const authMiddleware = require('../middleware/autth.middleware').checkLoginToken


//users routes

router.post('/api/users/login', authController.Login)
router.post('/api/users/register', authController.Register)

router.get('/api/todos',[authMiddleware], todoController.getTodos)
router.get('/api/todos/:id',[authMiddleware], todoController.getOneTodo)
router.post('/api/todos',[authMiddleware], todoController.postTodo)
router.put('/api/todos/:id',[authMiddleware], todoController.putTodo)
router.delete('/api/todos/:id',[authMiddleware], todoController.deleteTodo)

module.exports = router