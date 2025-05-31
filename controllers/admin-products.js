
import {addNewItemToProduct} from '../modules/product.js' 
// functions of routes admin.js

const productCHome = (req , res , next) => {
    res.render('admin/add-product.ejs' , {productTitle : 'products page' 
        , title : 'product page' 
        , path : '/admin/home'}) ;
}
const productCproduct = (req , res , next) =>{
    const reqB = req.body ;
    const product = new addNewItemToProduct(reqB.title , reqB.image , reqB.price , reqB.description)
    product.addToProducts()
    res.redirect('/admin/home');
}

const adminProductsView = (req , res , next) => {
    addNewItemToProduct.fetchAll((products)=>{
        res.render('admin/products-view.ejs' , { products : products  , title : 'admin view' , path : '/admin/products-view'});
    })
}
const adminProductEdit = (req , res , next) =>{
    const ID = req.params.productId ;
    addNewItemToProduct.delete(ID);
    res.render('admin/edit-product' , {products : products  , title : 'admin edit' , path : '/admin/edit-product'})
}  

const adminProductDelete = (req , res , next) => {
    const ID = req.params.productId ;
    
    res.redirect('/admin/products-view');
}


const admin = {productCHome , productCproduct 
    , adminProductsView , adminProductEdit , adminProductDelete } ;


export  { admin }