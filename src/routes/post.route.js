const express = require("express");
import PostModel from "../models/post.models";
const verifyToken = require("../middlewares/auth.middleware");
const routerV2 = express.Router();
//get
routerV2.get("/", verifyToken, (req, res) => {
  //id cua user tao request
  PostModel.find({ user: req._id }).populate("user",['username'])
    .then((data) => {
      res.json({
        success: true,
        data: data,
      });
    })
    .catch((err) => res.json(err));
});
//post api/posts
routerV2.post("/", verifyToken, (req, res) => {
  const { title, description, url, status } = req.body;
  if (!title || !description) {
    return res.status(400).json({
      success: false,
      message: `Bạn cần nhập title và description`,
    });
  }
  PostModel.create({
    title,
    description,
    url,
    status: status || "Pending",
    user: req._id,
  })
    .then((data) => {
      res.status(500).json({
        success: true,
        message: `Hãy bắt đầu ngay thôi nào!!`,
        data: data,
      });
    })
    .catch((err) => res.status(500).json(`Có lỗi xảy ra:` + err));
});

//put
routerV2.put("/:id", verifyToken, (req, res) => {
  //id cua user tao request
  const { title, description, url, status } = req.body;
  if (!title) {
    return res.status(400).json({
      success: false,
      message: `Title không được để trống`,
    });
  }
  PostModel.findByIdAndUpdate({_id:req.params.id,user:req._id},{
    title,
    description: description||"",
    url,
    status: status || "Pending"
  },{new:true})
    .then((data) => {
      if(data){
        res.json({
          success: true,
          message: `Cập nhật thành công!!`,
          data: data,
        });
      }else return res.json({
        success:false,
        message:`Cập nhật thất bại`
      })
    })
    .catch((err) => res.status(500).json(`Có lỗi xảy ra:` + err));
});

//delete
routerV2.delete("/:id", verifyToken, (req, res) => {
  //id cua user tao request
  PostModel.findOneAndDelete({ _id:req.params.id,user: req._id })
  .then((data) => {
    if(data){
      res.json({
        success: true,
        message: `Xóa thành công!!`,
        data: data,
      });
    }else return res.json({
      sucess:false,
      message:`Xóa thất bại`
    })
  })
    .catch((err) => res.json(err));
});
module.exports = routerV2;
