import jwt from 'jsonwebtoken'
import {nanoid} from 'nanoid'
import { cookieOptions } from '../config/config.js'
export const generateNanoId = (length=8)=>{
    return nanoid(length)
}

export const signToken = (payload)=>{
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d"})

}

export const verifyToken = (token)=>{
    return jwt.verify(token, process.env.JWT_SECRET)
}