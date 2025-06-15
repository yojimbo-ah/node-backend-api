import { Sequelize } from "sequelize";


const sequelize = new Sequelize('node-complete' , 'root' , 'pubgmobile-123?3m' , {
    host : 'localhost' , dialect : 'mysql'
})



export default sequelize ;