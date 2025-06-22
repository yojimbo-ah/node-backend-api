import { Product } from "../modules/product.js";
import { getdb } from "../utils/database.js";
import { ObjectId } from 'mongodb' ;
import { User } from "../modules/user.js";
import { Order } from "../modules/order.js";

const productCSHop = (req , res , next) => {
    Product.fetchAll()
    .then(products => {
        res.render('shop/shop.ejs' , {products : products , title : 'shop' , path : '/shop'})
    })
    .catch(err => {
        console.log(err)
    })
}

const clientCartGet = (req , res , next) => {
    let user = req.user ;
    User.getCart(user.id)
    .then(cart => {
        console.log( 'cart :' , cart);
        res.render('shop/cart.ejs' , {cart : cart , path : '/cart' , title : 'cart' , id : req.user.id}) ;
    })
    .catch(err => {
        console.log(err)
    }) 
   
}

const clientCartPost = (req , res , next) => {
        const reqId = req.params.productId ;
        Product.findById(reqId)
        .then(product => {
            return req.user.addToCart(product)
        })
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => {
            console.log(err)
        })
}

const clientProductView = (req , res , next) => {
        
        res.render('shop/product-detail.ejs' , {title : 'product details' , path : '/prodcut-detail'})
}

const clientIndex = (req , res , next) => {
    Product.fetchAll()
    .then(products => {
        res.render('shop/index.ejs' , { products : products  , title : 'index page' , path : '/index'});
    })
    .catch(err => {
        console.log(err)
    })
}

const clientOrders = (req , res , next) => {
    let user = req.user ;
    Order.getOrder(user.id)
    .then(orders => {
        console.log(orders)
        res.render('shop/orders.ejs' , {title : 'orders page' , path : '/orders' , orders : orders}) ;
    })
    .catch(err => {
        console.log(result);
    })

}
const prodcutDetails = (req , res , next) => {
    const productId = req.params.productId ;
    Product.findById(productId)
    .then(product => {
        console.log(product)
        res.render('shop/product-detail.ejs' ,
            {product : product , title : `product detail ` , path : 'product details' })
    })
    .catch(err => {
        console.log(err)
    })
}
const clientProductCartDelete = (req , res , next) => {
    const deleteId = req.params.ID ;
    console.log('delete iddddd :' ,  deleteId);
    let user = req.user ;
    user.deleteById(deleteId)
    .then(result => {
        res.redirect('/cart')
    })
    .catch(err => {
        console.log(err)
    })

}

const createOrder = (req , res , next) => {
   let user = req.user ;
   user.addToOrder()
   .then(result => {
    console.log(result);
    res.redirect('/cart');
   })
   .catch(err => {
    console.log(err)
   })
}

const client = {productCSHop , clientCartGet , clientCartPost  
    , clientProductView , clientIndex , clientOrders ,
     prodcutDetails , clientProductCartDelete , createOrder} ;

export { client }

