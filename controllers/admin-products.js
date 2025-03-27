
import {addNewItemToProduct} from '../modules/product.js' 
// functions of routes admin.js

const productCHome = (req , res , next) => {
    res.render('admin/add-product.ejs' , {productTitle : 'products page' 
        , title : 'product page' 
        , path : '/admin/home'}) ;
}
const prodcutCproduct = (req , res , next) =>{
    const product = new addNewItemToProduct(req.body.title)
    product.addToProducts()
    res.redirect('/');
}

const adminProductsView = (req , res , next) => {
    res.render('admin/products-view.ejs' , {title : 'admin view' , path : '/admin/products-view'})
}


const admin = {productCHome , prodcutCproduct , adminProductsView} ;


export  { admin }