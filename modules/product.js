import mongoose from 'mongoose'

const Schema = mongoose.Schema


const ProductSchema = new Schema({
    name : {
        type : String ,
        required : true
    } ,
    price : {
        type : Number ,
        required : true
     } ,
    description : {
        type : String ,
        required : true
    } ,
    image : {
        type : String ,
        required : true 
    } ,
    userId : {
        type : Schema.Types.ObjectId ,
        required : true ,
        ref : 'User'
    }

} , {timestamps : true})
const Product = mongoose.model('Product' , ProductSchema);

export { Product }
