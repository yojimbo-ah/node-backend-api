
import express from 'express' ;
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { title } from 'process';

// controller import 
import { productCHome , prodcutCproduct} from '../controllers/productsc.js';

// Get the equivalent of __filename and __dirname
const __filename = fileURLToPath(import.meta.url);  // Convert import.meta.url to file path
const __dirname = dirname(__filename);


const routerAdmin = express.Router()

routerAdmin.use('/home' , productCHome)
routerAdmin.post('/product' ,prodcutCproduct )


export { routerAdmin };