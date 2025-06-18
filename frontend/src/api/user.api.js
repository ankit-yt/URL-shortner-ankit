import axiosInstance from "../utils/axiosInstance"

export const loginUser = async (email,password)=>{
    return  await axiosInstance.post("/auth/login",{email,password})
}

export const registerUser = async (name,email,password)=>{
    return  await axiosInstance.post("/auth/register",{name,email,password})
}

export const logoutUser = async ()=>{
    return  await axiosInstance.get("/auth/logout")
}

export const getCurrentUser = async ()=>{
    return  await axiosInstance.get("/auth/me")
}

export const getAllUserUrls = async ()=>{
    return await axiosInstance.get("/api/getUrls")
}
