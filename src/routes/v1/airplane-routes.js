const express=require('express');
const {AirplaneMiddlewares}=require('../../middleware');
const router=express.Router();

const {AirplaneController}=require('../../controllers')
console.log("Reached at ./")

// /api/v1/airplanes POST
router.post('/',
    AirplaneMiddlewares.validateCreateRequest,
    AirplaneController.createAirplane);

// /api/v1/airplanes GET
router.get('/',AirplaneController.getAirplanes);

// /api/v1/airplanes/:id  GET
router.get('/:id',AirplaneController.getAirplane);



module.exports=router;

