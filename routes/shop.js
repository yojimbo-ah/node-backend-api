
import express from 'express' ;
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);  
const __dirname = dirname(__filename);

import { client } from '../controllers/client.js';


const routerShop = express.Router() ;

routerShop.get('/' , client.productCSHop );
routerShop.get('/cart' , client.clientCart) ;

export { routerShop };
