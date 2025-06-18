import mongoose from 'mongoose'
const urlShortSchema = new mongoose.Schema({
  full_url: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  clicks: {
    type: Number,
  },
  type:{type:String,required:true,default:"Random"},
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
},{timestamps:true});

export default mongoose.model("urlShort", urlShortSchema);
