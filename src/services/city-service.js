const {CityRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');

const cityRepository=new CityRepository();


async function createCity(data){
    try {
        const city=await cityRepository.create(data);
        return city;   
    } catch (error) {
        if(error.name==='SequelizeValidationError'){
            let explaination=[];
            error.errors.forEach((err) => {
                explaination.push(err.message);  
            });
            throw new AppError(explaination,StatusCodes.BAD_REQUEST);
        }
        throw error('Cannot Create a new city object',StatusCodes.INTERNAL_SERVER_ERROR);  
    }

}


module.exports={
    createCity
}