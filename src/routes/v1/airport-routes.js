const express=require('express');
const {AirportMiddlewares}=require('../../middleware');
const router=express.Router();

const {AirportController}=require('../../controllers')

// /api/v1/airports POST
router.post('/',
    AirportMiddlewares.validateCreateRequest,
    AirportController.createAirport);

// /api/v1/airports GET
router.get('/',AirportController.getAirports);

// /api/v1/airports/:id  GET
router.get('/:id',AirportController.getAirport);

// /api/v1/airports/:id  DELETE
router.delete('/:id',AirportController.destroyAirport);

// /api/v1/airports/:id  UPDATE
router.patch('/:id',AirportController.updateAirport);






module.exports=router;

