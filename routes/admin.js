import http from 'http' ;
import express from 'express' ;
import path from 'path' ;
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { title } from 'process';

// Get the equivalent of __filename and __dirname
const __filename = fileURLToPath(import.meta.url);  // Convert import.meta.url to file path
const __dirname = dirname(__filename);


const routerAdmin = express.Router()
const products = [] ;

routerAdmin.use('/home' , (req , res , next) => {
    res.render('product.ejs' , {productTitle : 'products page' , title : 'product page' , path : '/admin/home'}) ;
})

routerAdmin.post('/product' , (req , res , next) =>{
    products.push({title : req.body.title});
    res.redirect('/');
})



export { routerAdmin  , products };