import { Sequelize , DataTypes } from "sequelize";
import sequelize from "../utils/database.js";


const CartItem = sequelize.define('cartItem' , {
    id : {
        type : DataTypes.INTEGER ,
        allowNull : false ,
        autoIncrement : true , 
        unique : true ,
        primaryKey : true
    } , 
    quantity : {
        type : DataTypes.INTEGER , 
    }
})

export {CartItem}