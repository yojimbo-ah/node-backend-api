import {addNewItemToProduct} from '../modules/product.js' 

const productCSHop = (req , res , next) => {
    addNewItemToProduct.fetchAll((products)=>{
        res.render('shop/shop.ejs' , { products : products  , title : 'shop page' , path : '/shop'});
    })
}

const clientCartGet = (req , res , next) => {
    res.render('shop/cart.ejs' , {title : 'cart' , path : '/cart'}) ;
}

const clientCartPost = (req , res , next) => {
    const reqId = req.body.productId ;
    console.log(reqId);
    res.redirect('/cart');
}

const clientProductView = (req , res , next) => {
    res.render('shop/product-detail.ejs' , {title : 'product details' , path : '/prodcut-detail'})
}

const clientIndex = (req , res , next) => {
    addNewItemToProduct.fetchAll((products)=>{
        res.render('shop/index.ejs' , { products : products  , title : 'index page' , path : '/index'});
    })
}

const clientCheckout = (req , res , next) => {
    res.render('shop/checkout.ejs' , {title : 'checkout page' , path : '/checkout'})
}
const clientOrders = (req , res , next) => {
    res.render('shop/orders.ejs' , {title : 'orders page' , path : '/orders'}) ;
}
const prodcutDetails = (req , res , next) => {
    const productId = req.params.productId ;
    addNewItemToProduct.findById(productId , (product) => {
        console.log(product) ;
        res.render('shop/product-detail.ejs' , {title : 'product details' , path : '/prodcut-detail' , product : product}) ;

    } )
}

const client = {productCSHop , clientCartGet , clientCartPost  
    , clientProductView , clientIndex , clientCheckout 
    , clientOrders , prodcutDetails} ;

export { client }
