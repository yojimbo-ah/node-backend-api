import { Product } from "../modules/product.js"
import { User } from "../modules/user.js"

const productCSHop = (req , res , next) => {
    Product.find()
    .then(products => {
        let authenticated = req.session.loggedIn ;
        res.render('shop/shop.ejs' , {products : products , title : 'shop' , path : '/shop' , authenticated : authenticated})
    })
    .catch(err => {
        console.log(err)
    })
}

const clientCartGet = (req , res , next) => {
    let userId = req.session.userId ;
    User.findById(userId).
    then(user => {
        user.getCart()
        .then(cart => {
            let authenticated = req.session.loggedIn ;
            console.log( 'cart :' , cart);
            res.render('shop/cart.ejs' , {cart : cart , path : '/cart' , title : 'cart' , id : user._id , authenticated : authenticated}) ;
        })
    })
    .catch(err => {
        console.log(err)
    }) 
   
}

const clientCartPost = (req , res , next) => {
        const reqId = req.params.productId ;
        Product.findById(reqId)
        .then(product => {
            User.findById(req.session.userId)
            .then(user => {
                user.addToCart(product)
                .then(() => {
                    res.redirect('/cart');
                })
            })
            .catch(err => {
                console.log(err)
            })
        })
}

const clientProductView = (req , res , next) => {
        let authenticated = req.session.loggedIn ;
        res.render('shop/product-detail.ejs' , {title : 'product details' , path : '/prodcut-detail' , authenticated : authenticated})
}

const clientIndex = (req , res , next) => {
    Product.find()
    .then(products => {
        let authenticated = req.session.loggedIn ;
        res.render('shop/index.ejs' , { products : products  , title : 'index page' , path : '/index' , authenticated : authenticated});
    })
    .catch(err => {
        console.log(err)
    })
}

const clientOrders = (req , res , next) => {
    let userId = req.session.userId ;
    User.findById(userId)
    .then(user => {
    user.getOrders()
        .then(orders => {
            let authenticated = req.session.loggedIn ;
            console.log(orders)
            res.render('shop/orders.ejs' , {title : 'orders page' , path : '/orders' , orders : orders , authenticated : authenticated}) ;
        })
    })
    .catch(err => {
        console.log(err);
    })

}
const prodcutDetails = (req , res , next) => {
    const productId = req.params.productId ;
    Product.findById(productId)
    .then(product => {
        let authenticated = req.session.loggedIn ;
        console.log(product)
        res.render('shop/product-detail.ejs' ,
            {product : product , title : `product detail ` , path : 'product details'  , authenticated : authenticated})
    })
    .catch(err => {
        console.log(err)
    })
}
const clientProductCartDelete = (req , res , next) => {
    const deleteId = req.params.ID ;
    let userId = req.session.userId ;
    User.findById(userId)
    .then(user => {
        Product.findById(deleteId)
        .then(product => {
            console.log(product)
            return user.delete(product)
        })
        .then((result) => {
            res.redirect('/cart')
        })
    })
    .catch(err => {
        console.log(err)
    })

}

const createOrder = (req , res , next) => {
   let userId = req.session.userId ;
   User.findById(userId)
   .then(user => {
       user.addToOrder()
        .then(result => {
            console.log(result);
            res.redirect('/cart');
        })
   })
   .catch(err => {
    console.log(err)
   })

}

const client = {productCSHop , clientCartGet , clientCartPost  
    , clientProductView , clientIndex , clientOrders ,
     prodcutDetails , clientProductCartDelete , createOrder} ;

export { client }

