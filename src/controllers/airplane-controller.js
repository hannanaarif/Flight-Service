const {StatusCodes}=require('http-status-codes');
const {AirplaneService}=require('../services');
const { response } = require('express');
const {SuccessResponse,ErrorResponse} = require('../utils/common');


async function createAirplane(req,res){
    try {
        console.log('Airplane controller',AirplaneService);
        const airplane=await AirplaneService.createAirplane({
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity
        })
        console.log('Implementented New Error and Success');
        SuccessResponse.data=airplane;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse)
           
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.statuscode)
        .json(ErrorResponse);
    }
}

async function getAirplanes(req,res){
    try {
        const airplane=await AirplaneService.getAirplane();
        SuccessResponse.data=airplane;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
        
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.statuscode)
        .json(ErrorResponse);
        
    }
   
}
module.exports={
    createAirplane,
    getAirplanes
}