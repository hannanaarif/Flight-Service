const {StatusCodes}=require('http-status-codes');
const {SuccessResponse,ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    console.log("Middleware name",req.body.name)
    console.log("Middleware cityId",req.body.cityId)
    console.log("Middleware code",req.body.code)


    if(!req.body.name){
        ErrorResponse.message='Something went wrong while create an airport';
        ErrorResponse.error=new AppError(['Name not found in the comming request',StatusCodes.BAD_REQUEST]);
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse);
    }
    if(!req.body.code){
        ErrorResponse.message='Something went wrong while create an airport';
        ErrorResponse.error=new AppError(['Airport code not found in the comming request',StatusCodes.BAD_REQUEST]);
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse);
    }
    if(!req.body.cityId){
        ErrorResponse.message='Something went wrong while create an airport';
        ErrorResponse.error=new AppError(['cityId not found in the comming request',StatusCodes.BAD_REQUEST]);
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse);
    }
    next();
}
module.exports={
    validateCreateRequest
}