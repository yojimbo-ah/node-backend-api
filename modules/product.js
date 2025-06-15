import sequelize from "../utils/database.js";
import { DataTypes , Sequelize } from "sequelize";

const Product = sequelize.define('product' , {
    id : { 
    type : DataTypes.INTEGER ,
    autoIncrement : true ,
    primaryKey : true ,
    allowNull : false  ,
    unique : true
    } ,
    name : {
        type : DataTypes.STRING(255) ,
        allowNull : false 
    } ,
    price : {
        type : DataTypes.DECIMAL(8,2) ,
        allowNull : false 
    } , 
    description : {
        type : DataTypes.TEXT ,
        allowNull : false ,
    } , 
    image : {
        type : DataTypes.TEXT ,
        allowNull : true 
    }
})


export { Product }