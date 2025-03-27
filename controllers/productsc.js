
import {addNewItemToProduct} from '../modules/product.js' 
// functions of routes admin.js

const productCHome = (req , res , next) => {
    res.render('product.ejs' , {productTitle : 'products page' 
        , title : 'product page' 
        , path : '/admin/home'}) ;
}
const prodcutCproduct = (req , res , next) =>{
    const product = new addNewItemToProduct(req.body.title)
    product.addToProducts()
    res.redirect('/');
}

// functions of routes shop.js
const productCSHop = (req , res , next) => {
    addNewItemToProduct.fetchAll((products)=>{
        res.render('shop.ejs' , { products : products  , title : 'shop page' , path : '/'});
    })
    
}

// functions of notFound.js 








export  { productCHome , prodcutCproduct ,productCSHop }