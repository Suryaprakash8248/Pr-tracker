import mongoose from "mongoose";

const prSchema =  new mongoose.Schema({
   workout:{
    type:String,
    required:true
  },
  weight: {
    type: Number,
    required:true,
    min:0
  },
  rep:{
    type: Number,
    required:true,
    min:0
  }
}, {timestamps:true})

const Pr = new mongoose.model("pr", prSchema);

export default Pr;