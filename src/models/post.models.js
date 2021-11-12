const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    tile: { type: String, require: true},
    description: { type: String, require: true },
    url: { type: String, default: null },
    status:{type:String,enum:['Success','Pending','Failed']},
    user:{type:Schema.Types.ObjectId,ref:'users'}
  },
  {
    collection: "posts",
  }
);
const PostModel = mongoose.model("posts", postSchema);
module.exports =PostModel;
