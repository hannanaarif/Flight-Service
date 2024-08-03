const express=require('express');
const router=express.Router();

const {CityController}=require('../../controllers')

const {CityMiddlewares} =require('../../middleware')

// /api/v1/city POST
router.post('/',
    CityMiddlewares.validateCreateRequest,
    CityController.createCity
);


module.exports=router;

