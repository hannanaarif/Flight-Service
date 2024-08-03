const express=require('express');
const router=express.Router();

const {CityController}=require('../../controllers')
console.log("Reached at ./")

// /api/v1/city POST
router.post('/',CityController.createCity);


module.exports=router;

