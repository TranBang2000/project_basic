const express = require("express");
import PostModel from "../models/post.models";
const verifyToken = require("../middlewares/auth.middleware");
const routerV2 = express.Router();
//get
routerV2.get("/",verifyToken, (req, res) => {
  PostModel.find({ _id: req._id })
    .then((data) => {
      res.json({
        success: true,
        data:data
      });
    })
    .catch((err) => res.json(err));
});
//post api/posts
routerV2.post('/',(req,res)=>{
  const { title, description, url, status } = req.body;
  if(!title||!description){
    return res.status(400).json({
            success: false,
            message: `Bạn cần nhập title và description`,
    });
  }
  PostModel.create({title,description,url,status: status || "Pending",user:"618e3c33f8dcdbbc1366596e"})
  .then(data=>{
      res.json({
        success: true,
        message: `Hãy bắt đầu ngay thôi nào!!`,
        data: data,
      });
  })
  .catch((err) => res.status(500).json(`Có lỗi xảy ra:` + err));
})

module.exports = routerV2;
