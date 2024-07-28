const { classToInvokable } = require('sequelize/lib/utils');
const {AirplaneRepository}=require('../repositories');
const AppError = require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');

const airplaneRepository=new AirplaneRepository();

async function createAirplane(data){
    console.log("Reached Aiplane service");
    console.log('!!!Data',data);

    try {
        const airplane=await airplaneRepository.create(data);
        return airplane;
        
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
        throw error('Cannot Create a new Airplane object',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }

}

async function getAirplanes(){
    try {
        const airplanes=await airplaneRepository.getAll();
        return airplanes;
        
    } catch (error) {
        throw new AppError('cannot fetch data of all the airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id){
    try {
        const airplane=await airplaneRepository.get(id);
        return airplane;
        
    } catch (error) {
        if(error.statuscode==StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested is not present',error.statuscode);
        }
        throw new AppError('cannot fetch data of the airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirplane(id){
    try {
        const airplane=await airplaneRepository.destroy(id);
        return airplane;
        
    } catch (error) {
        if(error.statuscode==StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested to delete is not present',error.statuscode);
        }
        throw new AppError('cannot fetch data of the airplane',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


async function updateAirplane(id, updateData) {
    try {
        console.log("At service of Update")
        // Fetch the existing airplane
        const airplane = await airplaneRepository.get(id);

        if (!airplane) {
            throw new AppError('The airplane you requested is not present', StatusCodes.NOT_FOUND);
        }

        // Update the airplane with new data
        console.log("calling update after get");
        const updatedAirplane = await airplaneRepository.update(id, updateData);

        return updatedAirplane;
        
    } catch (error) {
        if (error.statuscode === StatusCodes.NOT_FOUND) {
            throw new AppError('The airplane you requested is not present', error.statuscode);
        }
        throw new AppError('Cannot update the airplane data', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports={
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}