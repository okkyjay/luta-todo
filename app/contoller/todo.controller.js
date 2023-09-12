const TodoModel = require('../model/todo.model')
exports.getTodos = async (req, res) => {
    try {
        const userId = req.userId
        const todos = await TodoModel.find({userId:userId})
        res.send({todos})
    } catch (error) {
        
    }
}
exports.postTodo = async (req, res) => {
    try {
        //const title = req.body.title
        //const desc = req.body.description
        const userId = req.userId
        const {title, description, completed, progress} = req.body
        const newTask = new TodoModel({
            title: title,
            description: description,
            progress: progress,
            completed: completed,
            userId: userId
        })
        await newTask.save()
        res.send({
            status: true,
            message: "Sucessful",
            data: newTask
        })
    } catch (error) {
        console.log(error)
    }
}

exports.putTodo = async (req, res) => {
    try {
        const {title, description, completed, progress} = req.body
        const {id} = req.params
        const todo = await TodoModel.findById(id)
        if(!todo){
            return res.send({
                status: false,
                message: 'The record update does not exisr'
            })
        }else{
            const updatedTodo = {
                title: title,
                description: description,
                progress: progress,
                completed: completed
            }
            const updateRec = await TodoModel.findByIdAndUpdate(id, updatedTodo)
            if(updateRec){
                return res.send({
                    status: true,
                    message: "Todo updated successfully"
                })
            }else{
                return res.send({
                    status: false,
                    message: "Todo failed to update"
                })
            }
        }
    } catch (error) {
        console.error(error)
    }
}

exports.getOneTodo = async (req, res) => {
    try {
        const {id} = req.params
        if(id){
            const todo = await TodoModel.findById(id)
            if(todo){
                return res.send({
                    status: true,
                    message: "Todo found",
                    data: todo
                })
            }else{
                return res.send({
                    status: false,
                    messafe: "Todo not found"
                })
            }
        }else{
            return res.send({
                status: false,
                message: "ID is required"
            })
        }
    } catch (error) {
        console.log(error)
    }
}


exports.deleteTodo = async (req, res) => {
    try {
        const {id} = req.params
        if(id){
            const todo = await TodoModel.findById(id)
            if(todo){
                const deleteRc = await TodoModel.deleteOne({_id: id})
                if(deleteRc){
                    return res.send({
                        status: true,
                        message: "Todo Deleted"
                    })
                }
            }
        }else{
            return res.send({
                status: false,
                message: "ID is required"
            })
        }
    } catch (error) {
        console.error(error)
    }
}