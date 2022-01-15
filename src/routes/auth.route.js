const express = require("express");
import UserModel from "../models/user.models";
import { env } from "../config/enviroments";
import verifyToken from "../middlewares/auth.middleware";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const argon2 = require("argon2");

const routerV1 = express.Router();

routerV1.get("/", verifyToken, (req, res) => {
  UserModel.findById(req._id)
    .select("-password")
    .then((data) => {
      if (data) {
        res.json({ success: true, data });
      } else
        return res
          .status(400)
          .json({ success: false, message: "Không tìm thấy người dùng" });
    })
    .catch((err) =>
      res.status(500).json({ success: false, message: "Có lỗi xảy ra " + err })
    );
});
//router POST api/auth/register
routerV1.post("/register", async (req, res) => {
  //lay un pw tu client
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({
      success: false,
      message: `Bạn cần nhập tài khoản và mật khẩu`,
    });
  //  UserModel.findOne({username})
  // .then(data=>{
  //     if(data){
  //         return res.json({
  //             success:false,
  //             message: `Tài khoản đã tồn tại`
  //         })
  //     }
  //     else{
  //         // const hashedPassword=argon2.hash(password)

  //         return UserModel.create({username,password})
  //     }
  // })
  // .then(data=>{
  //     jwt.sign({_id: data._id},env.TOKEN_SECRET,(err,token)=>{
  //         if(token){
  //             res.json({
  //                 success:true,
  //                 message: `Tạo tài khoản thành công`,
  //                 token
  //             })
  //         }
  //         else{
  //             res.json(`Có lỗi xảy ra: `+err)
  //         }
  //     })

  // })
  // .catch(err=>res.json(`Có lỗi xảy ra:`+err))
  try {
    const user = await UserModel.findOne({ username });
    if (user) {
      return res
        .status(400)
        .json({ success: false, message: `Tài khoản đã tồn tại` });
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();
    const token = jwt.sign({ _id: newUser._id }, env.TOKEN_SECRET);
    return res.json({
      success: true,
      message: `Tạo tài khoản thành công`,
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: `Có lỗi xảy ra ` + error });
  }
});
//router POST api/auth/login
routerV1.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({
      success: false,
      message: `Bạn cần nhập tài khoản và mật khẩu`,
    });
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: `Tài khoản hoặc mật khẩu không đúng`,
      });
    }
    //pass trong db,pass ng dung nhap
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid) {
      res.status(400).json({
        success: false,
        message: `Tài khoản hoặc mật khẩu không đúng`,
      });
    }
    const token = jwt.sign({ _id: user._id }, env.TOKEN_SECRET);
    if (token) {
      res.json({
        success: true,
        message: `Đăng nhập thành công`,
        token,
      });
    } else
      res.status(400).json({ success: false, message: `Đăng nhập thất bại` });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: `Đã có lỗi xảy ra ` + err });
  }
  // UserModel.findOne({username,password})
  // .then(data=>{
  //     if(!data){
  //         return res.status(400).json({
  //             success:false,
  //             message: `Tài khoản hoặc mật khẩu không đúng`
  //         })
  //     }else{

  //         jwt.sign({_id: data._id},env.TOKEN_SECRET,(err,token)=>{
  //             if(token){
  //                 res.json({
  //                     success:true,
  //                     message: `Đăng nhập thành công`,
  //                     token
  //                 })
  //             }
  //             else{
  //                 res.json(`Có lỗi xảy ra: `+err)
  //             }
  //         })
  //     }
  // })
});

module.exports = routerV1;
