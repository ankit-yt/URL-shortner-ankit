import { createUser, findUserByEmail } from "../dao/user.dao.js";
import { ConflictError } from "../utility/customErrors.js";
import apiError from "../utility/errorHandle.js";
import { signToken } from "../utility/helper.js";

export const registerUserService = async (name, email, password) => {
  console.log("service email:" + email);
  const user = await findUserByEmail(email);
  if (user) {
    throw new ConflictError("User already exists");
  }
  const newUser = await createUser({ name, email, password });
  const token = signToken({ id: newUser._id });

  return {token,newUser};
};

export const loginUserService = async (email, password) => {
  const user = await findUserByEmail(email);
 
  if (!user) {
    throw new apiError("Invalid credentials", 401);
  }
  const isValidPassword = await user.comparePassword(password)
  if(!isValidPassword){
    throw new apiError("Invalid credentials", 401)
  }
  const token = signToken({ id: user._id });
  return {token,user};
};
