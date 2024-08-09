const express=require('express');
const {FlightMiddlewares}=require('../../middleware');
const router=express.Router();

const {FlightController}=require('../../controllers');

// /api/v1/airports POST
router.post('/',
    FlightMiddlewares.validateCreateRequest,
    FlightController.createFlight);


// /api/v1/airports GET
router.get('/',FlightController.getAllFlights);


module.exports=router;

