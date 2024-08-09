const {StatusCodes}=require('http-status-codes');
const {SuccessResponse,ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');

function validateCreateRequest(req,res,next){
    if(!req.body.flightNumber){
        console.log("flightNumber",flightNumber);
        ErrorResponse.message='Something went wrong while creating flight';
        ErrorResponse.error=new AppError(['FlightNumber not found in the coming request',StatusCodes.BAD_REQUEST]);
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse);
    }
    if(!req.body.airplaneId){
        ErrorResponse.message='Something went wrong while creating flight';
        ErrorResponse.error=new AppError(['AirplaneId not found in the coming request',StatusCodes.BAD_REQUEST]);
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse);
    }
    if(!req.body.departureAirportId){
        ErrorResponse.message='Something went wrong while creating flight';
        ErrorResponse.error=new AppError(['departureairportId not found in the coming request',StatusCodes.BAD_REQUEST]);
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse);
    }
    if(!req.body.arrivalAirportId){
        ErrorResponse.message='Something went wrong while creating flight';
        ErrorResponse.error=new AppError(['arrivalAirportId not found in the coming request',StatusCodes.BAD_REQUEST]);
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse);
    }
    if(!req.body.arrivalTime){
        ErrorResponse.message='Something went wrong while creating flight';
        ErrorResponse.error=new AppError(['arrivalTime not found in the coming request',StatusCodes.BAD_REQUEST]);
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse);
    }
    if(!req.body.departureTime){
        ErrorResponse.message='Something went wrong while creating flight';
        ErrorResponse.error=new AppError(['departureTime not found in the coming request',StatusCodes.BAD_REQUEST]);
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse);
    }
    if(!req.body.price){
        ErrorResponse.message='Something went wrong while creating flight';
        ErrorResponse.error=new AppError(['price not found in the coming request',StatusCodes.BAD_REQUEST]);
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse);
    }
    if(!req.body.totalSeats){
        ErrorResponse.message='Something went wrong while creating flight';
        ErrorResponse.error=new AppError(['Totalseats not found in the coming request',StatusCodes.BAD_REQUEST]);
        return res
                 .status(StatusCodes.BAD_REQUEST)
                 .json(ErrorResponse);
    }
    next();
}
module.exports={
    validateCreateRequest
}