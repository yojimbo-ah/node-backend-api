import sequelize from "../utils/database.js";
import { Sequelize , DataTypes } from "sequelize";

const Cart = sequelize.define('cart' , {
    id : {
        type : DataTypes.INTEGER ,
        allowNull : false , 
        autoIncrement : true ,
        unique : true ,
        primaryKey : true
    }
}) ;

export {Cart}