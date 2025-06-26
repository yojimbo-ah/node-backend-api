
import express from 'express' ;
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);  
const __dirname = dirname(__filename);

import { client } from '../controllers/client.js';
import { isAuth } from '../middleware/is-auth.js';

const routerShop = express.Router() ;

routerShop.get('/shop' , client.productCSHop);
routerShop.get('/' , client.clientIndex );
routerShop.post('/shop/buy/:productId' , isAuth, client.clientCartPost) ;
routerShop.get('/cart' , isAuth ,client.clientCartGet) ;
routerShop.post('/cart/delete/:ID' , isAuth , client.clientProductCartDelete) ;
routerShop.post('/order/check' , isAuth ,client.createOrder) ;
routerShop.get('/orders' , isAuth ,client.clientOrders) ;

/*
routerShop.get('/product-details/:productId' , client.prodcutDetails) ;
routerShop.get('/product-detail' , client.clientProductView) ;
*/

export { routerShop };
