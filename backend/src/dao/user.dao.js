import shortUrlModel from "../models/shortUrl.model.js"
import userSchema from "../models/user.model.js"

export const findUserByEmail = async (email)=>{
    console.log(email)
    return await userSchema.findOne({email}) 

}

export const findUserById = async (id)=>{
    return await userSchema.findById(id)
}


export const createUser = async (name, email,password)=>{
    const newUser = new userSchema(name,email,password)
     await newUser.save();
     return newUser;
}

export const updateUser = async (id,name,email,password)=>{
    const user = await userSchema.findById(id)
    if(!user){
        throw new Error("User not found")
    }
    user.name = name
    user.email = email
    user.password = password
    await user.save()
    return user
}

export const deleteUser = async (id)=>{
    const user = await userSchema.findById(id)
    if(!user){
        throw new Error("User not found")
    }
    await user.deleteOne({_id:id})
    return user
}


export const getUrlByUserId = async (userId)=>{
    return await shortUrlModel.find({user:userId}).sort({createdAt:-1})
}