import { generateNanoId } from "../utility/helper.js"
import urlschema from "../models/shortUrl.model.js";
import { deleteUrlDao, findOrgUrl, saveShortUrl } from "../dao/shortUrl.js";
import apiError from "../utility/errorHandle.js"

export const shortUrlWithOutUserService = async (url)=>{

      try{
        const isCustom = false
        const shortUrl = generateNanoId(7)
      
     const newUrl = await saveShortUrl(url, shortUrl,isCustom )
    
    return newUrl
      }catch(err){
        throw err
      }
}

export const redirectionService = async (shortUrl)=>{
     const orgUrl = await findOrgUrl(shortUrl)
   if(orgUrl){
    //   res.redirect(orgUrl.full_url);
    return orgUrl
   }else{
    //   res.status(404).send("Url not found");
    return null
   }
}

export const shortUrlWithUserService = async (url,userId,customUrl=null )=>{
      try{
        let isCustom = true
        let shortUrl;
        if(!customUrl){
          isCustom = false
           shortUrl = generateNanoId(7)
        }
        if(customUrl){
          isCustom= true
          
        }
        console.log("insideshorturlwithuserservice")
        console.log(isCustom)
        
     const newUrl = await saveShortUrl(url, customUrl ? customUrl : shortUrl,isCustom,userId )
    return newUrl
      }catch(err){
        throw err
      }
}

export const deleteUrlService = async (urlId , userId)=>{
  return await deleteUrlDao(urlId,userId)
}