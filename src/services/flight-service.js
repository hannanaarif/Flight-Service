const {FlightRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');
const { datetimeHelpers } = require('../utils/helpers');
const {Op}=require('sequelize');


const flightRepository=new FlightRepository();

async function createFlight(data){
    try {
        //Departure and arrival time validation
        if(!datetimeHelpers.compareTime(data.arrivalTime, data.departureTime)){
            throw new AppError('Arrival time must be greater than departure time', StatusCodes.BAD_REQUEST);
        }
        //Departure and arrival airport cannot be same
        else if(data.departureAirportId == data.arrivalAirportId){
            throw new AppError('Departure and arrival airport reference cannot be same', StatusCodes.BAD_REQUEST);
        }
        const flight=await flightRepository.create(data);
        return flight;
        
    } catch (error) {
        if(error.name==='SequelizeValidationError'){
            let explaination=[];
            error.errors.forEach((err) => {
                explaination.push(err.message);  
            });
            console.log(explaination);
            throw new AppError(explaination,StatusCodes.BAD_REQUEST);
        }
        else if(error.name == "SequelizeForeignKeyConstraintError" || error.name == "SequelizeDatabaseError" || error.statuscode == StatusCodes.BAD_REQUEST){
           throw new AppError(error.message, StatusCodes.BAD_REQUEST);
        }
        console.log(error);
        throw new AppError('Cannot Create a new flight object',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }

}
async function getAllFlights(query){
    let customFilter={};
    let sortFilter=[];
    const endingTripTime="23:59:00"; 
    //trips-MUM-DEL
    if(query.trips){
        [departureAirportId,arrivalAirportId]=query.trips.split("-");
        customFilter.departureAirportId=departureAirportId;
        customFilter.arrivalAirportId=arrivalAirportId;
        if(departureAirportId===arrivalAirportId){
            throw new AppError('ArrivalAirport & DepartureAirport should not be same',StatusCodes.BAD_REQUEST)
        }

    }
    if(query.price){
        [minPrice,maxPrice]=query.price.split("-");
        customFilter.price={
            [Op.between]:[minPrice,(maxPrice===undefined)?20000:maxPrice]
        }
    }
    if(query.travellers){
        customFilter.totalSeats= {
            [Op.gte]:query.travellers
        }
    }
    if(query.tripDate){
        customFilter.departureTime={
            [Op.between]:[query.tripDate,query.tripDate+endingTripTime]
        }
    }
    if(query.sort){
        const params=query.sort.split(',');
        const sortFilters=params.map((param)=> param.split('_'));
        sortFilter=sortFilters
    }
    try {
        const flights= await flightRepository.getAllFlights(customFilter,sortFilter);
        return flights;  
    } catch (error) {
        throw new AppError('cannot fetch data of all the flights',StatusCodes.INTERNAL_SERVER_ERROR); 
    }

}
async function getFlight(id){
    try {
        const flight=await flightRepository.get(id);
        return flight;
    } catch (error) {
        if(error.statuscode==StatusCodes.NOT_FOUND){
            throw new AppError('The flight you requested is not present',error.statuscode);
        }
        throw new AppError('cannot fetch data of the flight',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateSeats(data){
    try {
        const response=await flightRepository.updateRemaingSeats(data.flightId,data.seats,data.dec);
        return response;
    } catch (error) {
        throw new AppError('cannot update data of the flight',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
}