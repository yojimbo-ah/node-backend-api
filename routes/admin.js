
import express from 'express' ;
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { title } from 'process';

//middle ware
import { isAuth } from '../middleware/is-auth.js';
// controller import 
import {admin} from '../controllers/admin-products.js';

// Get the equivalent of __filename and __dirname
const __filename = fileURLToPath(import.meta.url);  // Convert import.meta.url to file path
const __dirname = dirname(__filename);


const routerAdmin = express.Router() ;
routerAdmin.post('/product' , admin.productCproduct ) ;
routerAdmin.get('/home' , admin.productCHome) ;
routerAdmin.get('/products-view' , isAuth , admin.adminProductsView) ;
routerAdmin.get('/delete-product/:productId' , isAuth , admin.adminProductDelete);
routerAdmin.get('/edit-product/:productId',isAuth  , admin.adminProductEdit);
routerAdmin.post('/edit-product/step/:productId', isAuth ,  admin.adminProductEdit2);

export { routerAdmin };