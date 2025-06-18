import { cookieOptions } from "../config/config.js";
import {
  loginUserService,
  registerUserService,
} from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(password.length>6)
    if (password.length <= 6) {
  throw new Error("Password should be more than 6 characters");
}
    const {token,user} = await registerUserService(name, email, password);
    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({ user:user,message: "Registered successfull" });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const {token,user} = await loginUserService(email, password);
    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({user:user, message: "Login successfull" });
  } catch (err) {
    next(err);
  }
};


export const getCurrentUser =  (req,res)=>{
    try{
      res.status(200).json({user:req.user})
    }catch(err){
      next(err);
    }
}

export const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.user = null;
  res.status(200).json({ message: "Logout successfull" });
};