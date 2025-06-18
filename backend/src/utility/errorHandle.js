class apiError extends Error{
    constructor( message,statusCode=500, isOperational = true){
        super(message)
        this.statusCode = statusCode
        this.isOperational = isOperational
        this.name="APIError"
        Error.captureStackTrace(this, this.constructor);
    }
}

export default apiError;