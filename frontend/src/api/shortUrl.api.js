import axiosInstance from "../utils/axiosInstance"

export const CreateShortUrl = async (url)=>{
    return await axiosInstance.post("/create", {url})
}

export const createCustomUrl = async (url,customUrl)=>{
    return await axiosInstance.post("/create/customUrl", { url, customUrl });
}

export const deleteUrl = async (id)=>{
    console.log(id)
    return await axiosInstance.post("/deleteUrl",{id})
}