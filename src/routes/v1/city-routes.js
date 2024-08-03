const express=require('express');
const router=express.Router();

const {CityController}=require('../../controllers')

const {CityMiddlewares} =require('../../middleware')

// /api/v1/city POST
router.post('/',
    CityMiddlewares.validateCreateRequest,
    CityController.createCity
);

// /api/v1/airplanes/:id DELETE
router.delete('/:id',CityController.destroyCity);
// /api/v1/airplanes/:id PATCH
router.patch('/:id', CityController.updateCity)


module.exports=router;

