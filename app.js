import http from 'http' ;
import express from 'express' ;
import session from 'express-session';
import bodyParser from 'body-parser' ;
import path from 'path' ;
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import csurf from 'csurf';
import flash from 'connect-flash'
import multer from 'multer';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import fs from 'fs'
import https from 'https'
dotenv.config()


import { fileURLToPath } from 'url';
import { dirname } from 'path';


// Get the equivalent of __filename and __dirname
const __filename = fileURLToPath(import.meta.url);  // Convert import.meta.url to file path
const __dirname = dirname(__filename);

// imoported middleware functions
import { routerAdmin  } from './routes/admin.js' ;
import { routerShop } from './routes/shop.js';
import { authRouter } from './routes/auth.js';

// modules 
import { Product } from "./modules/product.js"
import { User } from "./modules/user.js"
// imported controller functions 
import { error404, error500 } from './controllers/error404.js';
console.log(process.env.NODE_ENV)




const app = express() ;
let store = MongoStore.create({
    mongoUrl : `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.echqncm.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0`,
    collectionName : 'sessions'
})
const fileStorage = multer.diskStorage({
    destination : (req , file , cb) => {
        cb(null , 'images') 
    } ,
    filename : (req , file , cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
})
const fileFilter = (req , file , cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null , true)
    } else {
        cb(null , false)
    }
}

const csrfProtection = csurf() ;


app.set('view engine' , 'ejs');
app.set('views' , 'views')

app.use(bodyParser.urlencoded({extended : false})) ;
app.use(multer({storage : fileStorage , fileFilter : fileFilter}).single('image'))

app.use(express.static(path.join(__dirname , './public'))) ;
app.use('/images', express.static(path.join(__dirname, './images')));

const accessLogStream = fs.createWriteStream(path.join(__dirname,'..', '..' , 'access.log') , {flags : 'a'} )
app.use(helmet())
app.use(compression())
app.use(morgan('combined' , {stream : accessLogStream}))
app.use(session({
    secret : 'my secret session',
    resave : false ,
    saveUninitialized : false ,
    store : store
}))
app.use(flash())

app.use((req , res, next) => {
    if(!req.session.userId) {
        return next()
    } else {
        User.findOne({_id : req.session.userId})
        .then(user => {
            if (!user) {
                return next()
            } else {
                req.user = user ; 
                next()
            }
        })
        .catch(err => {
            next(new Error(err))
        })
    }
})
app.use(csrfProtection)
app.use((req , res , next) => {
    res.locals.csrfToken = req.csrfToken();
    next();

})
app.use(authRouter);
app.use('/admin' , routerAdmin ) ;
app.use('/' , routerShop ) ;
app.use(error404)
app.use((error , req , res , next) => {
    error500(error , req , res , next)
})


mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.echqncm.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority&appName=Cluster0`)
.then(result => {
    console.log('connected')
    app.listen(process.env.PORT || 3000)
})
.catch(err => {
    console.log(err)
})






