const express=require('express');
const router=express.Router();

const {CityController}=require('../../controllers')

const {CityMiddlewares} =require('../../middleware')

// /api/v1/city POST
router.post('/',
    CityMiddlewares.validateCreateRequest,
    CityController.createCity
);
console.log("delete Router from city-routes");
router.delete('/:id',CityController.destroyCity);


module.exports=router;

