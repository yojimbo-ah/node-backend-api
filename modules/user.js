import { connectToDatabase , getdb } from "../utils/database.js"
import { ObjectId } from "mongodb";
import { Product } from "./product.js";

class User  {
    constructor (name , email , age , cart , id) {
        this.name = name ;
        this.email = email ;
        this.age = age ;
        this.cart = cart ;
        this.id = id ;
    }

    save () {
        let db = getdb() ;
        return db.collection('users').insertOne(this)
        
    }
    deleteById (ID) {
        let db = getdb() ;
        return db.collection('users').updateOne({_id : this.id} ,
            {$pull : {"cart.items" : {productId : new ObjectId(ID)}}})

    }
    static findById (userId) {
        let db = getdb() ;
        return db.collection('users').findOne({_id : new ObjectId(userId)})
        
    }
    addToOrder () {
        let db = getdb() ;
        return User.getCart(this.id)
        .then(cart => {
            return db.collection('orders').insertOne({cart : cart , ownerId : this.id})
            .then(result => {
                return db.collection('users').updateOne({_id : this.id} , {
                    $set : {cart : {totalPrice : 0 , items : []}}
                } )
            })
        })
    }

    addToCart (product) {
        let db = getdb();
        let cartProducts = this.cart.items ;
        let temp  = cartProducts.find(Element => {
            return Element.productId.toString() === product._id.toString() ;
        })
        if (temp) {
            return db.collection('users').updateOne({_id : new ObjectId(this.id) , "cart.items.productId" : product._id} 
            , {$inc : {"cart.items.$.quantity" : 1}})
        } else {
            return db.collection('users').updateOne({_id : new ObjectId(this.id)} 
            , {$push : {"cart.items" : {productId : product._id , quantity : 1} }})
        }
    }

    static getCart(ID) {
        return User.findById(ID)
        .then(user => {
            return user.cart
        })
        .then(cart => {
            let newCart = {totalPrice : 0 , products : []} ;
            let itemsPromise = cart.items.map(element => {
                return Product.findById(element.productId)
                .then(product => {
                    newCart.products.push({...product , quantity : element.quantity}) ;
                    newCart.totalPrice = newCart.totalPrice + product.price * element.quantity ;
                })
                .catch(err => {
                    console.log(err) ;
                })
            });
        return Promise.all(itemsPromise)
        .then(() => {
            return newCart
        })
        })
        .then(newCart => {
            return newCart
        })
        .catch(err => {
            console.log(err)
        })
    }

    getOrders() {
        let db = getdb() ;
        db.collection('users').findOne({_id : this.id})
        .then()
        .catch(err => {
            console.log(err)
        })
    }
}

export {User}