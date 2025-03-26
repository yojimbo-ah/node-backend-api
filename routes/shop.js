import http from 'http' ;
import express from 'express' ;
import path from 'path' ;
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { products } from './admin.js';

const __filename = fileURLToPath(import.meta.url);  
const __dirname = dirname(__filename);


const routerShop = express.Router() ;

routerShop.get('/' , (req , res , next) => {
    console.log('your products : ' , products) ;
    res.render('shop.ejs' , { products : products  , title : 'shop page' , path : '/'});
})

export { routerShop };
