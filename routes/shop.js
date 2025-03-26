
import express from 'express' ;
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);  
const __dirname = dirname(__filename);

import { productCSHop } from '../controllers/productsc.js';


const routerShop = express.Router() ;

routerShop.get('/' , productCSHop )

export { routerShop };
