const {AirportRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');

const airportRepository=new AirportRepository();

async function createAirport(data){
    console.log("Reached Aiplane service");
    console.log('!!!Data',data);

    try {
        const airport=await airportRepository.create(data);
        return airport;
        
    } catch (error) {
        console.log(error);
        if(error.name==='SequelizeValidationError'){
            let explaination=[];
            error.errors.forEach((err) => {
                explaination.push(err.message);  
            });
            console.log(explaination);
            throw new AppError(explaination,StatusCodes.BAD_REQUEST);
        }
        throw error('Cannot Create a new Airport object',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }

}

async function getAirports(){
    try {
        const airports=await airportRepository.getAll();
        return airports;
        
    } catch (error) {
        throw new AppError('cannot fetch data of all the airports',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id){
    try {
        const airport=await airportRepository.get(id);
        return airport;
        
    } catch (error) {
        if(error.statuscode==StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested is not present',error.statuscode);
        }
        throw new AppError('cannot fetch data of the airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirport(id){
    try {
        const airport=await airportRepository.destroy(id);
        return airport;
        
    } catch (error) {
        if(error.statuscode==StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested to delete is not present',error.statuscode);
        }
        throw new AppError('cannot fetch data of the airport',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateAirport(data,id){
   try{
      const response= await airportRepository.update(data,id);
      return response;
    }
  catch(error){

    if(error.statuscode==StatusCodes.NOT_FOUND)
    {
           throw new AppError('The airport you requested to update is not present ',error.statusCode);
    }
    throw new AppError('Not able to fectch data of all the airports',StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports={
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}