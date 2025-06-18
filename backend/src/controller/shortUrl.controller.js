import {

  deleteUrlService,
  redirectionService,
  shortUrlWithOutUserService,
  shortUrlWithUserService,
} from "../services/shortUrl.service.js";


export const CreateShortUrl = async (req, res, next) => {
  try {
   let newUrl;
    const { url} = req.body;
    if (req.user) {
    newUrl = await shortUrlWithUserService(url,req.user);
    } else {
     newUrl = await shortUrlWithOutUserService(url);
    }
    res.status(200).json({ shortUrl: process.env.APP_URL + newUrl.short });
  } catch (err) {
    next(err);
  }
};

export const redirectToOriginalUrl = async (req, res, next) => {
  try {
    
    const { shortUrl } = req.params;
    const orgUrl = await redirectionService(shortUrl);
    if (orgUrl) {
      let redirectUrl = orgUrl.full_url;

      // If it doesn't start with http/https, add https:// by default
      if (!/^https?:\/\//i.test(redirectUrl)) {
        redirectUrl = "https://" + redirectUrl;
      }

      return res.redirect(redirectUrl);
    } else {
      throw new Error("short url not found");
    }
  } catch (err) {
    next(err);
  }
};

export const createCustomUrl = async (req, res, next) => {
  try {
    
   let newUrl;
    const { url, customUrl } = req.body;
    if (req.user) {
      newUrl = await shortUrlWithUserService(url,  req.user._id , customUrl);
    }
    res.status(200).json({ shortUrl: process.env.APP_URL + newUrl.short });
  } catch (err) {
    next(err);
  }
};

export const deleteUrl = async (req,res,next)=>{
  try{
    const {id} = req.body;
    console.log(id)
    await deleteUrlService(id, req.user._id);
    res.status(200).json({message: "url deleted successfully"});
  }catch(err){
    next(err);
  }

}