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

//GET:-/airplane

async function getAirplanes(req,res){
    try {
        const airplane=await AirplaneService.getAirplanes();
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

//GET:-/airplane/:id

async function getAirplane(req,res){
    try {
        const airplane=await AirplaneService.getAirplane(req.params.id);
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

//DELETE :/airplanes/:id

async function destroyAirplane(req,res){
    try {
        const airplane=await AirplaneService.destroyAirplane(req.params.id);
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
async function updateAirplane(req,res){

    try{
     const airplanes = await AirplaneService.updateAirplane({Capacity : req.body.Capacity},req.params.id);
     SuccessResponse.data = airplanes;
     return res.
               status(StatusCodes.CREATED)
              .json( SuccessResponse );
    }

    catch(error){
      ErrorResponse.error = error 
      return res
              .status(error.statuscode) //Error has Self Property statusCode we simply not write again we just                          //Pass it with statusCode
              .json(ErrorResponse);
    }
}
module.exports={
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}