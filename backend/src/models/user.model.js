import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from 'bcryptjs'
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true},
  
 avatar: {
  type: String,
},
});

// 🧠 Generate Gravatar URL from email
function getGravatarUrl(email, size = 200) {
  const trimmedEmail = email.trim().toLowerCase();
  const hash = crypto.createHash("md5").update(trimmedEmail).digest("hex");
  return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}

// ✅ Pre-save hook to set avatar if not provided
userSchema.pre("save", function (next) {
  if (!this.avatar || this.avatar.trim() === "") {
    this.avatar = getGravatarUrl(this.email);
  }
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password;
    delete ret.__v;
    return ret;
  },
})

const User = mongoose.model("user", userSchema);
export default User;
