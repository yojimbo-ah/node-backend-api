import {MongoClient} from 'mongodb'

const uri = 'mongodb+srv://abbadahmed:kKAls1NszXsiKXVR@cluster0.echqncm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const client = new MongoClient(uri) ;
let db ;

let connectToDatabase = () => {
    if(db) {
        return Promise.resolve(db)
    }

    return client.connect()
    .then(() => {
        db = client.db() ;
        console.log('connected') ;
        return db ;
    })
    .catch(err => {
        console.log('error cant connect') ;
        return Promise.reject(err)
    })
}

let getdb = () => {
    if (db) {
        return db
    }
    throw 'error there is no database'
}

export {connectToDatabase , getdb}

