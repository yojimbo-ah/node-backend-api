
import express from 'express' ;
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);  
const __dirname = dirname(__filename);

import { client } from '../controllers/client.js';


const routerShop = express.Router() ;

routerShop.get('/shop' , client.productCSHop);
routerShop.get('/' , client.clientIndex );
routerShop.get('/product-details/:productId' , client.prodcutDetails) ;
routerShop.get('/cart' , client.clientCartGet) ;
routerShop.post('/shop/buy/:productId' , client.clientCartPost) ;
routerShop.post('/cart/delete/:ID' , client.clientProductCartDelete) ;
routerShop.post('/order/check' , client.createOrder) ;
routerShop.get('/orders' , client.clientOrders) ;
/*

routerShop.get('/product-detail' , client.clientProductView) ;


*/
export { routerShop };
