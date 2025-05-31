
import {addNewItemToProduct} from '../modules/product.js' 
// functions of routes admin.js

const productCHome = (req , res , next) => {
    res.render('admin/add-product.ejs' , {productTitle : 'products page' 
        , title : 'product page' 
        , path : '/admin/home'}) ;
}
const productCproduct = (req , res , next) =>{
    const reqB = req.body ;
    const product = new addNewItemToProduct(reqB.title , reqB.image , reqB.price , reqB.description , null) ;
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
    addNewItemToProduct.findById(ID , product => {
    res.render('admin/edit-product.ejs' , {product : product , title : 'hello' , path : 'wawa'})
    })

}  
const adminProductEdit2 = (req , res , next) => {
    const reqB = req.body ;
    const productId = req.params.productId ;
    console.log(productId);
    const product = new addNewItemToProduct(reqB.title , reqB.image , reqB.price , reqB.description , productId);
    product.addToProducts()
    res.redirect('../../home');
}

const adminProductDelete = (req , res , next) => {
    const ID = req.params.productId ;
    addNewItemToProduct.delete(ID);
    res.redirect('/admin/products-view');
}


const admin = {productCHome , productCproduct 
    , adminProductsView , adminProductEdit , adminProductDelete  ,
    adminProductEdit2} ;


export  { admin }