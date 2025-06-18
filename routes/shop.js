
import express from 'express' ;
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);  
const __dirname = dirname(__filename);

import { client } from '../controllers/client.js';


const routerShop = express.Router() ;

routerShop.get('/' , client.clientIndex );
routerShop.get('/cart' , client.clientCartGet) ;
routerShop.post('/shop/buy/:productId' , client.clientCartPost) ;
routerShop.get('/product-detail' , client.clientProductView) ;
routerShop.get('/shop' , client.productCSHop);
routerShop.get('/checkout' , client.clientCheckout);
routerShop.get('/orders' , client.clientOrders) ;
routerShop.get('/product-details/:productId' , client.prodcutDetails) ;
routerShop.post('/cart/delete/:ID' , client.clientProductCartDelete)

export { routerShop };
