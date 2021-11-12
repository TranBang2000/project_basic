const express = require('express');
import UserModel from '../models/user.models'
import {env} from '../config/enviroments'
const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser')

const routerV1=express.Router();


//router POST api/auth/register
routerV1.post('/register', (req,res,next) =>{
    //lay un pw tu client
    const {username,password} = req.body
    if(!username||!password)
    return res.status(400).json({
        success:false,
        message:`Bạn cần nhập tài khoản và mật khẩu`,
    })
     UserModel.findOne({username})
    .then(data=>{
        if(data){
            return res.json({
                success:false,
                message: `Tài khoản đã tồn tại`
            })
        }
        else{
            // const hashedPassword=argon2.hash(password)

            return UserModel.create({username,password:password})
        }
    })
    .then(data=>{
        jwt.sign({_id: data._id},env.TOKEN_SECRET,(err,token)=>{
            if(token){
                res.json({
                    success:true,
                    message: `Tạo tài khoản thành công`,
                    token:token
                })
            }
            else{
                res.json(`Có lỗi xảy ra: `+err)
            }
        })
       
    })
    .catch(err=>res.json(`Có lỗi xảy ra:`+err))
    // const hashedPassword=await argon2.hash(password)
    // const newUser=new UserModel({username, password:hashedPassword})
    // await newUser.save()
    // const token=jwt.sign({_id:newUser._id},env.TOKEN_SECRET)
  
})
//router POST api/auth/login
routerV1.post('/login',(req, res,next)=>{
    const {username,password} = req.body
    if(!username||!password)
    return res.status(400).json({
        success:false,
        message:`Bạn cần nhập tài khoản và mật khẩu`,
    })
    UserModel.findOne({username,password})
    .then(data=>{
        if(!data){
            return res.status(400).json({
                success:false,
                message: `Tài khoản hoặc mật khẩu không đúng`
            })
        }else{
            jwt.sign({_id: data._id},env.TOKEN_SECRET,(err,token)=>{
                if(token){
                    res.json({
                        success:true,
                        message: `Đăng nhập thành công`,
                        token:token
                    })
                }
                else{
                    res.json(`Có lỗi xảy ra: `+err)
                }
            })
        }
    })
})

module.exports = routerV1