const {StatusCodes}=require('http-status-codes');
const {Flightservice}=require('../services');
const { response } = require('express');
const {SuccessResponse,ErrorResponse} = require('../utils/common');

/**
 * POST: /flights
 * req-body{
 *flightNumber:'UK 808',
 *airplaneId:'a380',
 *departureAirportId:12,
 *arrivalAirportId:11
 *arrivalTime:'11:10:00',
 *departureTime:'9:10:00'
 *price:2000
 *boardingGate:'12A',
 *totalSeats:120
 * }
 */
async function createFlight(req,res){
    try {
        console.log("Flight Controller",req.body.flightNumber);
        const flight=await Flightservice.createFlight({
            flightNumber:req.body.flightNumber,
            airplaneId:req.body.airplaneId,
            departureAirportId:req.body.departureAirportId,
            arrivalAirportId:req.body.arrivalAirportId,
            arrivalTime:req.body.arrivalTime,
            departureTime:req.body.departureTime,
            price:req.body.price,
            boardingGate:req.body.boardingGate,
            totalSeats:req.body.totalSeats
        })
        SuccessResponse.data=flight;
        return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse)
           
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.statuscode)
        .json(ErrorResponse);
    }
}
async function getAllFlights(req,res){
    try {
    const flights=await Flightservice.getAllFlights(req.query);
    SuccessResponse.data=flights;
    return res
        .status(StatusCodes.CREATED)
        .json(SuccessResponse)
        
    }catch(error){
        ErrorResponse.error=error;
        return res.status(error.statuscode)
        .json(ErrorResponse);
    }

}
async function getFlight(req,res){
    try {
        const flight=await Flightservice.getFlight(req.params.id);
        SuccessResponse.data=flight;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
        
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.statuscode)
        .json(ErrorResponse);
    }
}
async function updateSeats(req,res){
    try {
        console.log("Controller flightId,seats,dec:",req.params.id,req.body.seats,
             req.body.dec);
        const response=await Flightservice.updateSeats({
            flightId:req.params.id,
            seats:req.body.seats,
            dec:req.body.dec
        })
        SuccessResponse.data=response;
        return res
        .status(StatusCodes.OK)
        .json(SuccessResponse);
        
    } catch (error) {
        ErrorResponse.error=error;
        return res.status(error.statuscode)
        .json(ErrorResponse); 
    }
}

// async function getFlight(req,res){
//     try {
//         const flight=await Flightservice.getFlight();
//         SuccessResponse.data=flight;
//         return res
//         .status(StatusCodes.OK)
//         .json(SuccessResponse);
        
//     } catch (error) {
//         ErrorResponse.error=error;
//         return res.status(error.statuscode)
//         .json(ErrorResponse);
        
//     }
   
// }

module.exports={
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}