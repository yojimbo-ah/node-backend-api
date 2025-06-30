
import express from 'express' ;
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { title } from 'process';
import {body, check} from 'express-validator'
import { User } from '../modules/user.js'
import { Product } from '../modules/product.js'

//middle ware
import { isAuth } from '../middleware/is-auth.js';
// controller import 
import {admin} from '../controllers/admin-products.js';

// Get the equivalent of __filename and __dirname
const __filename = fileURLToPath(import.meta.url);  // Convert import.meta.url to file path
const __dirname = dirname(__filename);


const routerAdmin = express.Router() ;
routerAdmin.post('/product' , isAuth , 
     [
        body('name').notEmpty().withMessage('cant leave the name empty')
        .matches(/^[A-Za-z-_ ]+$/).withMessage('the name may contain only letters - _ and spaces')
        .isLength({min : 6 , max : 20}).withMessage('max lenght is 20 and minimum is 6 characters') ,
        body('price').matches(/^\d+(\.\d{1,2})?$/).withMessage('price must be positive and have two digits after the decimal point') ,
        body('description').notEmpty().withMessage('cant leave the description empty')
        .isLength({min : 10 , max : 120}).withMessage('the lenght must be more then 10 and less then 120')
        .matches(/^[A-Za-z0-9.-_ ]+$/).withMessage('the description must contain letters numbers and the symbols : - _ .')
] 
, admin.productCproduct ) ;
routerAdmin.get('/home' , admin.productCHome) ;
routerAdmin.get('/products-view' , isAuth , admin.adminProductsView) ;
routerAdmin.get('/delete-product/:productId' , isAuth , admin.adminProductDelete);
routerAdmin.get('/edit-product/:productId',isAuth  , admin.adminProductEdit);
routerAdmin.post('/edit-product/step/:productId', isAuth ,  
    [
        body('name').notEmpty().withMessage('cant leave the name empty')
        .matches(/^[A-Za-z-_ ]+$/).withMessage('the name may contain only letters - _ and spaces')
        .isLength({min : 6 , max : 20}).withMessage('max lenght is 20 and minimum is 6 characters') ,
        body('price').matches(/^\d+(\.\d{1,2})?$/).withMessage('price must be positive and have two digits after the decimal point') ,
        body('description').notEmpty().withMessage('cant leave the description empty')
        .isLength({min : 10 , max : 120}).withMessage('the lenght must be more then 10 and less then 120')
        .matches(/^[A-Za-z0-9.-_ ]+$/).withMessage('the description must contain letters numbers and the symbols : - _ .')
] ,  admin.adminProductEdit2);

export { routerAdmin };