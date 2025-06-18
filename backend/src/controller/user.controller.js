import {getUrlByUserId} from "../dao/user.dao.js"

export const getAllUserURLsController = async (req,res,next)=>{
    try{
        const {_id} = req.user
        console.log("hello")
        console.log(_id)
        const urls = await getUrlByUserId(_id)
        res.status(200).json({message:"success" ,urls})

    }catch(err){
        next(err)
    }
}