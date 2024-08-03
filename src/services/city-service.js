const {CityRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');

const cityRepository=new CityRepository();


async function createCity(data){
    try {
        const city=await cityRepository.create(data);
        return city;   
    } catch (error) {
        console.log(error);
        if(error.name==='SequelizeValidationError' ||error.name==='SequelizeUniqueConstraintError'){
            let explaination=[];
            error.errors.forEach((err) => {
                explaination.push(err.message);  
            });
            throw new AppError(explaination,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('Cannot Create a new city object',StatusCodes.INTERNAL_SERVER_ERROR);  
    }
}

async function destroyCity(id){
    try {
        console.log("City-service Id",id);
        const city=await cityRepository.destroy(id);
        return city;
        
    } catch (error) {
        if(error.statuscode==StatusCodes.NOT_FOUND){
            throw new AppError('The city you requested to delete is not present',error.statuscode);
        }
        throw new AppError('cannot fetch data of the airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id,data) {
    try {
        const response = await cityRepository.update(id,data);
        return response;
    } catch (error) {
        if(error.statusCodes = StatusCodes.NOT_FOUND) {
            throw new AppError('The requested city to update does not exist',error.statusCodes)
        }
        throw new AppError('Cannot fetch data of all the cities', StatusCodes.INTERNAL_SERVER_ERROR );
    }
}

module.exports={
    createCity,
    destroyCity,
    updateCity
}