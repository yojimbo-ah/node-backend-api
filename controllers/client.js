import { Product } from "../modules/product.js";
import { Order } from "../modules/order.js";
import { Cart } from "../modules/cart.js";

const productCSHop = (req , res , next) => {
    Product.findAll()
    .then(products => {
        res.render('shop/shop.ejs' , { products : products  , title : 'shop page' , path : '/shop'});
    }).catch(err => {
        console.log(err)
    })
}

const clientCartGet = (req , res , next) => {
    req.user.getCart()
    .then(cart => {
        cart.getProducts()
        .then(products => {
            console.log(products);
            res.render('shop/cart.ejs' , {cart : products , path : '/cart' , title : 'cart' , id : req.user.id}) ;
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(err => {
        console.log(err) ;
    })

}

const clientCartPost = (req , res , next) => {
    const reqId = req.params.productId ;
    req.user.getCart()
    .then(cart => {
        cart.getProducts({where : {id : reqId}})
        .then(products => {
            console.log(products) ;
            if (products.length === 0) {
                Product.findByPk(reqId)
                .then(product => {
                    cart.addProduct(product , {through : { quantity : 1 }});
                })
                .catch(err => {
                    console.log(err);
                })
            } else {
                let product = products[0] ;
                product.cartItem.quantity ++ ;
                product.cartItem.save()
                .then(()=> {
                    res.redirect('/cart');
                })
                .catch(err => {
                    console.log(err)
                })
            }
        })
    })
    .catch(err => {
        console.log(err)
    })
}

const clientProductView = (req , res , next) => {
    res.render('shop/product-detail.ejs' , {title : 'product details' , path : '/prodcut-detail'})
}

const clientIndex = (req , res , next) => {
    Product.findAll()
    .then(products => {
        res.render('shop/index.ejs' , { products : products  , title : 'index page' , path : '/index'});
    })
    .catch(err => {
        console.log(err)
    })
}

const clientOrders = (req , res , next) => {
    req.user.getOrders({include : ['products']})
    .then(orders => {
        res.render('shop/orders.ejs' , {title : 'orders page' , path : '/orders' , orders : orders}) ;
    })
    .catch(err => {
        console.log(err)
    })
}
const prodcutDetails = (req , res , next) => {
    const productId = req.params.productId ;
    Product.findByPk(productId)
    .then(product => {
        res.render('shop/product-detail.ejs' , {title : 'product details' , path : '/prodcut-detail' , product : product}) ;
    })
    .catch(err => {
        console.log(err) ;
    })
}
const clientProductCartDelete = (req , res , next) => {
    const deleteId = req.params.ID ;
    console.log('delete iddddd :' ,  deleteId);
    req.user.getCart()
    .then(cart => {
        cart.getProducts({where : {id : deleteId}})
        .then(products => {
            let product = products[0] ;
            product.cartItem.destroy()
            .then(() => {
                res.redirect('/cart') ;
            })
        })
    })

    .catch(err => {
        console.log(err)
    })

}

const createOrder = (req , res , next) => {
    let fetchedCart
    req.user.getCart()
    .then(cart => {
        fetchedCart = cart ;
        return cart.getProducts()
    })
    .then(products => {
        req.user.createOrder()
        .then(order => {
            return order.addProducts(products.map(product => {
                product.orderItem = {quantity : product.cartItem.quantity }
                return product ;
            }))
        })
        .then(() => {
            return fetchedCart.setProducts(null);
        })
        .then(result => {
            res.redirect('/cart')
        })
        .catch(err => {
            console.log(err)
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

