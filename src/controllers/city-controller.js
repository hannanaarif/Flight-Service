const {StatusCodes}=require('http-status-codes');
const {CityService}=require('../services');
const { response } = require('express');
const {SuccessResponse,ErrorResponse} = require('../utils/common');


async function createCity(req,res){
    console.log("City-Controller",req.body.name);
    try {
        console.log("Getting into CityController");
        const city=await CityService.createCity({
          name:req.body.name
        })
        SuccessResponse.data=city;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse)
           
    }catch (error) {
        console.log("Getting into Error CityController Error :-",error);
        ErrorResponse.error=error;
        console.log("Error Response",ErrorResponse);
        console.log("Error Statuscode",error.statuscode);
        return res.status(error.statuscode)
        .json(ErrorResponse);
    }
       /*catch (error) {
        console.log("Getting into Error CityController Error",error);
        ErrorResponse.error=error;
        return res.status(error.statuscode)
        .json(ErrorResponse);
    }*/
}

module.exports={
    createCity,
}

