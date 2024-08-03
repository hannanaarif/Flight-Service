const {StatusCodes}=require('http-status-codes');
const {CityService}=require('../services');
const { response } = require('express');
const {SuccessResponse,ErrorResponse} = require('../utils/common');


async function createCity(req,res){
    try {
        const city=await CityService.createCity({
          name:req.body.name
        })
        SuccessResponse.data=city;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse)
           
    }catch (error) {
        ErrorResponse.error=error;
        return res.status(error.statuscode)
        .json(ErrorResponse);
    }
}

async function destroyCity(req,res){
    try {
        const city=await CityService.destroyCity(req.params.id);
        SuccessResponse.data=city;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
        
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.statuscode)
        .json(ErrorResponse);
        
    }
   
}
async function updateCity(req, res) {
    try{
        const cities = await CityService.updateCity(req.params.id, {
            name:req.body.name
        });
        SuccessResponse.data = cities;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);

    }catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }

}

module.exports={
    createCity,
    destroyCity,
    updateCity
}

