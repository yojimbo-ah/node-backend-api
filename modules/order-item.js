import { Sequelize , DataTypes } from "sequelize";
import sequelize from "../utils/database.js";


const OrderItem = sequelize.define('orderItem' , {
    id : {
        type : DataTypes.INTEGER ,
        unique : true ,
        allowNull : false , 
        autoIncrement : true ,
        primaryKey : true
    } ,
    quantity : {
        type : DataTypes.INTEGER
    }
})

export { OrderItem }