import mongoose from 'mongoose' ;

const Schema = mongoose.Schema ;

const OrderSchema = new Schema ({
    userId : {
        type : Schema.Types.ObjectId ,
        required : true ,
        ref : 'User'
    } , 
    cart : {
        totalPrice : {
            type : Schema.Types.Number ,
            required : true 
        } ,
        products : [{
            productId : {
                type : Schema.Types.ObjectId ,
                required : true , 
                ref : 'Product'
            } ,
            quantity : {
                type : Number ,
                required : true 
            }
        }]
    }
})


const Order = mongoose.model('Order' , OrderSchema) ;
export {Order}
