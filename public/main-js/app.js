import http from 'http' ;
import express from 'express' ;
import session from 'express-session';
import bodyParser from 'body-parser' ;
import path from 'path' ;
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import csurf from 'csurf';
import flash from 'connect-flash'
import { Resend } from 'resend';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the equivalent of __filename and __dirname
const __filename = fileURLToPath(import.meta.url);  // Convert import.meta.url to file path
const __dirname = dirname(__filename);

// imoported middleware functions
import { routerAdmin  } from '../../routes/admin.js' ;
import { routerShop } from '../../routes/shop.js';
import { authRouter } from '../../routes/auth.js';

// modules 
import { Product } from "../../modules/product.js"
import { User } from "../../modules/user.js"
// imported controller functions 
import { error404 } from '../../controllers/error404.js';


const app = express() ;
let store = MongoStore.create({
    mongoUrl : 'mongodb+srv://abbadahmed:kKAls1NszXsiKXVR@cluster0.echqncm.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0',
    collectionName : 'sessions'
})

const csrfProtection = csurf() ;


app.set('view engine' , 'ejs');
app.set('views' , 'views')


app.use(bodyParser.urlencoded({extended : false})) ;
app.use(express.static(path.join(__dirname , '../../public'))) ;
app.use(session({
    secret : 'my secret session',
    resave : false ,
    saveUninitialized : false ,
    store : store
}))
app.use(flash())

app.use(csrfProtection)
app.use((req , res , next) => {
    res.locals.csrfToken = req.csrfToken();
    next();

})
app.use( authRouter);
app.use('/admin' , routerAdmin ) ;
app.use('/' , routerShop ) ;


mongoose.connect('mongodb+srv://abbadahmed:kKAls1NszXsiKXVR@cluster0.echqncm.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0')
.then(result => {
    console.log(result)
    app.listen(3000)
})
.catch(err => {
    console.log(err)
})






