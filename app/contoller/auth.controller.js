const bycrptJs = require('bcryptjs')
const userModel = require('../model/user.model')
const jwt = require('jsonwebtoken')
const configEnv = require('../config/index.config')
const Joi = require('joi')

exports.Login = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email){
            return res.send({
                status: false,
                message:"Email field is required"
            })
        }
        
        if(!password){
            return res.send({
                status: false,
                message:"Password field is required"
            })
        }
        const user = await userModel.findOne({email: email})
        if(user){
            const passwordIsValid = await bycrptJs.compare(password, user.password)
            if(!passwordIsValid){
                return res.send({
                    status: false,
                    message:"Invalid credientals provided"
                })
            }
            if(passwordIsValid){
                const token = jwt.sign({id: user.id}, configEnv.token_secret, {
                    expiresIn: configEnv.token_lifetime
                })
                return res.send({
                    status: true,
                    message: 'Successful',
                    data: {
                        token: token,
                        user: {
                            email: user.email
                        }
                    }
                })
            }
        }else{
            return res.send({
                status: false,
                message:"User does not exist"
            })
        }
    } catch (error) {
        
    }
}

exports.Register = async (req, res) => {
    try {
        const signValidatin = Joi.object({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required().min(8).max(100)
        })
        const {error, value} = signValidatin.validate(req.body)
        if(error){
            return res.send({
                status: false,
                message: 'Some fileds provided are not valid',
                err: error.details
            })
        }
        const {name, email, password} = req.body
        // if(!name){
        //     return res.send({
        //         status: false,
        //         message:"Name field is required"
        //     })
        // }
        // if(!email){
        //     return res.send({
        //         status: false,
        //         message:"Email field is required"
        //     })
        // }
        
        // if(!password){
        //     return res.send({
        //         status: false,
        //         message:"Password field is required"
        //     })
        // }
        const userExist = await userModel.findOne({email: email})
        if(userExist){
            return res.send({
                status: false,
                message:"Email already exist"
            })
        }
        const hashKey = await bycrptJs.genSalt(10)
        const hashedPassword = await bycrptJs.hash(password, hashKey)
        
        const newUser = new userModel({
            email:email,
            name: name,
            password: hashedPassword
        })
        const user = await newUser.save()
        if(user){
            return res.send({
                status: true,
                message: "Successful",
                data: user
            })
        }else{
            return res.send({
                    status: false,
                    message: "Error creating new user"
            })
        }
    } catch (error) {
        console.error(error)
    }
}