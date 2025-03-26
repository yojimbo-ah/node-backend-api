import http from 'http' ;
import express from 'express' ;
import fs from 'fs' ;
import dotenv from 'dotenv';
import bodyParser from 'body-parser' ;
import path from 'path' ;

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the equivalent of __filename and __dirname
const __filename = fileURLToPath(import.meta.url);  // Convert import.meta.url to file path
const __dirname = dirname(__filename);

// imoported middleware functions
import { routerAdmin  , products} from './routes/admin.js' ;
import { routerShop } from './routes/shop.js';

const app = express() ;
app.listen(3000)

app.set('view engine' , 'ejs');
app.set('views' , 'views')


app.use(bodyParser.urlencoded({extended : false})) ;

app.use(express.static(path.join(__dirname , './public'))) ;

// the router countains are middlewares :

app.use('/admin' , routerAdmin ) ;

app.use('/' , routerShop ) ;

app.use('/' , ( req , res , next ) => {
    console.log(__dirname);
    res.status(404).render('notFound.ejs' , {title : 'error page' , path : ''})
})






