import http from 'http' ;
import express from 'express' ;
import bodyParser from 'body-parser' ;
import path from 'path' ;

import {  connectToDatabase } from '../../utils/database.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the equivalent of __filename and __dirname
const __filename = fileURLToPath(import.meta.url);  // Convert import.meta.url to file path
const __dirname = dirname(__filename);

// imoported middleware functions
import { routerAdmin  } from '../../routes/admin.js' ;
import { routerShop } from '../../routes/shop.js';

// modules 
import { User } from '../../modules/user.js';
import { Product } from '../../modules/product.js';

// imported controller functions 
import { error404 } from '../../controllers/error404.js';


const app = express() ;



app.set('view engine' , 'ejs');
app.set('views' , 'views')


app.use(bodyParser.urlencoded({extended : false})) ;
app.use(express.static(path.join(__dirname , '../../public'))) ;



app.use((req , res , next) => {
    User.findById('6856dbbf650c9b93e9bcd612')
    .then(user => {
        let user1 = new User(user.name , user.email , user.age , user.cart , user._id)
        req.user = user1
        next()
    })
    .catch(err => {
        console.log(err)
    })
} )
    

app.use('/admin' , routerAdmin ) ;
app.use('/' , routerShop ) ;


connectToDatabase()
.then(client => {
    console.log(client)
    app.listen(3000)
})
.catch(err => {
    console.log(err)
})






