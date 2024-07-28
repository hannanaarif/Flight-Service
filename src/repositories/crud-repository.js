const { where } = require('sequelize');
const {Logger}=require('../config');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

class crudRepository{
    constructor(model){
        this.model=model;
    }
    async create(data){
           const response=await this.model.create(data);
           return response;
    }
    async destroy(data){
           const response=await this.model.destroy({
            where:{
                id:data
            }
           });
           if(!response){
            throw new AppError('Not able to find the resource',StatusCodes.NOT_FOUND);
           }
           return response;     
    }
    async get(data){
           const response=await this.model.findByPk(data);
           if(!response){
            throw new AppError('Not able to find the resource',StatusCodes.NOT_FOUND);
           }
           return response;     
    }
    async getAll(data){
           const response=await this.model.findAll();
           return response;  
    }

    async update(id, data) {
        try {
            console.log("Data :-",data);
            console.log("At Crud_repository of update");
            const [updated] = await this.model.update(data, { where: { id } });
            if (updated === 0) {

                throw new AppError('Not able to find the resource',StatusCodes.NOT_FOUND);
            }
            return this.findById(id); // Return the updated record
        } catch (error) {
            throw new AppError('Not able to find the resource',StatusCodes.NOT_FOUND);
        }
    }  
}

module.exports=crudRepository;