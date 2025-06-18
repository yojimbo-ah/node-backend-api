import sequelize from "../utils/database.js";
import { Sequelize , DataTypes } from "sequelize";

const Order = sequelize.define('order' , {
    id : {
        type : DataTypes.INTEGER ,
        unique : true ,
        allowNull : false ,
        autoIncrement : true ,
        primaryKey : true
    }
})


export { Order }