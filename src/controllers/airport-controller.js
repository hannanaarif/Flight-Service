const {StatusCodes}=require('http-status-codes');
const {AirportService}=require('../services');
const { response } = require('express');
const {SuccessResponse,ErrorResponse} = require('../utils/common');

/**
 * POST: /airports
 * req-body{name: 'IGI',cityId: 5, code:'DEL'
 * }
 */
async function createAirport(req,res){
    try {
        console.log("controll name",req.body.name)
        console.log("controll cityId",req.body.cityId)
        console.log("controll code",req.body.code)
        const airport=await AirportService.createAirport({
            name:req.body.name,
            code:req.body.code,
            address:req.body.address,
            cityId:req.body.cityId
        })
        console.log("controll airport ",airport);
        SuccessResponse.data=airport;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse)
           
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.statuscode)
        .json(ErrorResponse);
    }
}

//GET:-/airport

async function getAirports(req,res){
    try {
        console.log("get Airports from controller");
        const airplane=await AirportService.getAirports();
        console.log("response Airports from controller",airplane);
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

async function getAirport(req,res){
    try {
        const airport=await AirportService.getAirport(req.params.id);
        SuccessResponse.data=airport;
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

async function destroyAirport(req,res){
    try {
        const airport=await AirportService.destroyAirport(req.params.id);
        SuccessResponse.data=airport;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
        
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.statuscode)
        .json(ErrorResponse);
        
    }
   
}
async function updateAirport(req,res){
    try{
     const airport = await AirportService.updateAirport({Capacity : req.body.Capacity},req.params.id);
     SuccessResponse.data = airport;
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
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}