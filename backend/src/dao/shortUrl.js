import urlSchema from "../models/shortUrl.model.js";
import { ConflictError } from "../utility/customErrors.js";
export const saveShortUrl = async (url, shortUrl, isCustom,userId) => {
  try {
    console.log("inside saveshorturl ")
    console.log(isCustom)
    const newUrl = new urlSchema({
      full_url: url,
      short: shortUrl,
    });
    if (userId) {
      newUrl.user = userId;
    }
    if(isCustom){
      newUrl.type = "custom"
    }
    await newUrl.save();
    return newUrl;
  } catch (err) {
    if (err.code === 11000) {
      throw new ConflictError("Url already exist");
    }
    throw new Error(err);
  }
};

export const findOrgUrl = async (shortUrl) => {
  console.log(shortUrl);
  const orgUrl = await urlSchema.findOneAndUpdate(
    { short: shortUrl },
    { $inc: { clicks: 1 } }
  );
  return orgUrl;
};

export const deleteUrlDao = async (id,userId)=>{
  return await urlSchema.findByIdAndDelete({_id:id, user:userId})
}