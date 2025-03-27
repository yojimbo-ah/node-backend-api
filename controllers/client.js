import {addNewItemToProduct} from '../modules/product.js' 

const productCSHop = (req , res , next) => {
    addNewItemToProduct.fetchAll((products)=>{
        res.render('shop/shop.ejs' , { products : products  , title : 'shop page' , path : '/'});
    })
}

const clientCart = (req , res , next) => {
    res.render('shop/cart.ejs' , {title : 'cart' , path : '/cart'}) ;
}

const client = {productCSHop , clientCart} ;

export { client }
