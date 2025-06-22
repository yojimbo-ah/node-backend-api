import { connectToDatabase , getdb } from "../utils/database.js"
import { ObjectId } from "mongodb";
import { Product } from "./product.js";
import { User } from "./user.js";

class Order {
    constructor(id , cart , owenrId) {
        this.id = id ;
        this.cart = cart ;
        this.owenrId = owenrId ;
    }


    static getOrder(ID){
        let db = getdb() ;
        return db.collection('orders').find({ownerId : ID}).toArray()
        .then(result => {
            return result ;
        })
    }
}

export { Order }