import { connectToDatabase , getdb } from "../utils/database.js"
import { ObjectId } from "mongodb";


class Product {
    constructor(name , description , price , image , userId) {
        this.name = name ;
        this.description = description ;
        this.price = price ; 
        this.image = image ;
        this.userId = userId ;
    }

    save() {
        const db = getdb() ;
        return db.collection('products').insertOne(this)
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
    }
    static fetchAll () {
        const db = getdb() ;
        return db.collection('products').find().toArray()
        .then(products => {
            console.log(products) ;
            return products ;
        })
        .catch(err => {
            console.log(err)
        })
    }

    static findById (productId) {
        const db = getdb() ;
        return db.collection('products')
        .findOne({_id : new ObjectId(productId)})
        .then(product => {
            return product ;
        })
        .catch(err => {
            console.log(err)
        })
    }

    static delete (productId) {
        let db = getdb() ;
        return db.collection('products')
        .deleteOne({_id : new ObjectId(productId)})
    }
    static update(productId , options) {
        let db = getdb() ;
        return db.collection('products')
        .updateOne({_id : new ObjectId(productId) },{ $set : 
            {name : options.name , price : options.price ,
            image : options.image , description : options.description}})
    }
}
export {Product}