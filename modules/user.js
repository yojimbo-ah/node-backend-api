import sequelize from "../utils/database.js";
import { DataTypes , Sequelize } from "sequelize";


const User = sequelize.define('user' , {
    id : {
        type : DataTypes.INTEGER ,
        allowNull : false , 
        autoIncrement : true ,
        unique : true ,
        primaryKey : true
    } , 
    name : {
        type : DataTypes.STRING ,
        unique : false ,
        allowNull : false ,
    } , 
    email : {
        type : DataTypes.STRING ,
        allowNull : false , 
        unique : true 
    } , 
    age : {
        type : DataTypes.INTEGER ,
        allowNull : false ,
    }
})

export { User }