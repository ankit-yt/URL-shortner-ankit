import apiError from "./errorHandle.js"

const GlobalErrHandler = (err, req ,res, next)=>{
    if (err instanceof apiError && err.isOperational) {
 
  return res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
}

console.error("UNEXPECTED ERROR 💥", err);

res.status(500).json({
  success: false,
  message: err.message ||"Something went wrong on the server."
});

}

export default GlobalErrHandler;