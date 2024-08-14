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


// /api/v1/airports/:id GET
router.get('/:id',FlightController.getFlight);


<<<<<<< HEAD
=======
// /api/v1/flights/:id/seats PATCH
router.patch('/:id/seats',
    FlightMiddlewares.validateUpdateSeatsRequest,
    FlightController.updateSeats,
)
>>>>>>> 669e33a (Add flight seats update api)

module.exports=router;

