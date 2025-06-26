import mongoose from "mongoose"
import { Order } from "./order.js"


const Schema = mongoose.Schema ;
const UserSchema = new Schema({
    name : {
        type : String ,
        required : true
    } ,
    age : {
        type : Number ,
        required : true 
    } ,
    email : {
        type : String ,
        required : true 
    } , 
    password : {
        type : String ,
        required : true
    } , 
    resetToken : {
        type : String ,
    } ,
    tokenExpDate : {
        type : Date ,
        }
    ,
    cart : {
        totalPrice : {
            type : Number ,
            required : true
        } ,
        products : [{
            productId : {
                type : Schema.Types.ObjectId ,
                required : true ,
                ref : 'Product'
            } , 
            quantity : {
                required : true ,
                type : Number 
            }
        }]
    }
})

UserSchema.methods.addToCart = function (product)  {
    let itemIndex = this.cart.products.findIndex(elem => {
        return elem.productId.toString() === product._id.toString()
    })
    if (itemIndex >= 0) {
        this.cart.products[itemIndex].quantity ++ ;
        this.cart.totalPrice += product.price ;
    } else {
        this.cart.totalPrice += product.price ;
        this.cart.products.push({productId : product._id , quantity : 1});
    }
    return  this.save()

}
UserSchema.methods.getCart = function () {
    return this.populate('cart.products.productId')
    .then(fullUser => {
        let cart = {
            products : fullUser.cart.products ,
            totalPrice : fullUser.cart.totalPrice
        } ;
        return cart ;
    })
    
}
UserSchema.methods.delete = function (product) {
    let productindex = this.cart.products.findIndex(elem => {
        return elem.productId.toString() === product._id.toString()
    })
    this.cart.totalPrice = this.cart.totalPrice - product.price * this.cart.products[productindex].quantity ;
    this.cart.products.splice(productindex , 1) ;
    return this.save()
}

UserSchema.methods.addToOrder = function () {
    let order = new Order ({
        userId : this.id ,
        cart : this.cart 
    })
    return order.save()
    .then(() => {
        this.cart = {
            products : [] ,
            totalPrice : 0
        } ;

        return this.save()
    })
}

UserSchema.methods.getOrders = function () {
    return Order.find({userId : this.id})
    .then(orders1 => {
        let orderPromise = orders1.map(elem => {
            return elem.populate('cart.products.productId');
        })
        return Promise.all(orderPromise)
    })
}

const User = mongoose.model('User' , UserSchema) ;
export { User }

