const express=require('express');
const {InfoController}=require('../../controllers');
const router=express.Router();

const AirplaneRoutes=require('./airplane-routes')
const CityRoutes=require('./city-routes')
const AirportRoutes=require('./airport-routes')
const FlightRoutes=require('./flight-routes')


router.get('/info',InfoController.info);

router.use('/airplanes',AirplaneRoutes);
router.use('/cities',CityRoutes);
router.use('/airports',AirportRoutes);
router.use('/flights',FlightRoutes)






module.exports=router;