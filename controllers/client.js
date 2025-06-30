import { Product } from "../modules/product.js"
import { User } from "../modules/user.js"
import fs from 'fs'
import path from "path"
import { Order } from "../modules/order.js"
import PDFKIT from 'pdfkit' 


import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ITEM_PER_PAGE = 20  ;

const productCSHop = (req , res , next) => {
    const page = parseInt(req.query.page) ;
    let totalProducts ;
    Product.countDocuments()
    .then(count => {
        totalProducts = count ;
        return Product.find().skip((page - 1) * ITEM_PER_PAGE).limit(ITEM_PER_PAGE)
    })
    .then(products => {
        let authenticated = req.session.loggedIn ;
        res.render('shop/shop.ejs' , {products : products , title : 'shop' , path : '/shop' , authenticated : authenticated
            , nextPageExist : page < Math.ceil(totalProducts / ITEM_PER_PAGE) , previousPageExist : page > 1 , nextPage : page + 1 
            , previousPage : page - 1   , page : page , lastPage : Math.ceil(totalProducts / ITEM_PER_PAGE)
        })
    })
    .catch(err => {
        console.log(err)
    })
}

const clientCartGet = (req , res , next) => {
    let userId = req.user._id ;
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
            User.findById(req.user._id)
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
    let userId = req.user._id ;
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
            err.httpStatusCode = 500 ;
            return next(err)
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
        err.httpStatusCode = 500 ;
        return next(err)
    })
}
const clientProductCartDelete = (req , res , next) => {
    const deleteId = req.params.ID ;
    let userId = req.user._id ;
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
        err.httpStatusCode = 500 ;
        return next(err)
    })

}

const createOrder = (req , res , next) => {
   let userId = req.user._id ;
   User.findById(userId)
   .then(user => {
       user.addToOrder()
        .then(result => {
            console.log(result);
            res.redirect('/cart');
        })
   })
   .catch(err => {
        err.httpStatusCode = 500 ;
        return next(err)
   })

}

const getInvoice = (req , res , next) => {
    const orderId = req.params.orderId ;
    const user = req.user ;
    console.log(1)
    Order.findOne({_id : orderId })
    .then(order => {
        console.log(req.user._id) ;
        console.log(order)
        if (order.userId.toString() === user._id.toString()) {
            console.log(2)
            const invoiceName = 'invoice-' + orderId + '.pdf' ;
            const invoicePath = path.join(__dirname ,'..' ,'data' , 'invoice' , invoiceName );
            console.log('invoicePath :' , invoicePath)
            const cartPromise = order.cart.products.map(productd => {
                console.log(productd)
                return Product.findOne({_id : productd.productId})
                .then(product => {
                    console.log(product)
                    return {
                        name : product.name ,
                        price : product.price ,
                        quantity : productd.quantity ,
                    }
                })
                .catch(err => {
                    console.log('error happened')
                })
            })
            console.log(3)
            Promise.all(cartPromise)
            .then((cart => {
                const generateInovice = (orders , totaltotal ,filePath) => {
                    console.log(4)
                    const doc = new PDFKIT() ;

                    res.setHeader('Content-Type' , 'application/pdf')
                    res.setHeader('Content-Disposition' , `inline; filename="${invoiceName}"`)

                    doc.pipe(res) ;

                    doc.fontSize(24).text('Inovice' , {underline : true})
                    doc.moveDown()
                    doc.fontSize(10).text(`Name : ${user.name}`)
                    doc.moveDown() ;
                    doc.fontSize(10).text(`Order id : ${order._id}`)
                    doc.moveDown()
                    doc.fontSize(10).text(`todays date : ${new Date()}`)
                    doc.moveDown(3)

                    doc.font('Helvetica-Bold')
                    doc.text('item name' , 50 , doc.y ,{continued : true})
                    doc.text('quantity' , 200 , doc.y ,{continued : true} )
                    doc.text('price' , 300 , doc.y , {continued : true} ) 
                    doc.text('total' , 400 , doc.y , )

                    doc.font('Helvetica')
                    doc.moveDown()
                    orders.forEach(product => {
                            let total = product.price * product.quantity ;

                            doc.text(`${product.name}` , 50 , doc.y  ,{continued : true})
                            doc.text(`${product.quantity}` , 200 , doc.y ,{continued : true})
                            doc.text(`$${product.price}` , 300 , doc.y  , {continued : true})
                            doc.text(`$${total}` , 400 , doc.y , )
                            doc.moveDown(1)

                    })

                    doc.moveDown(2)
                    doc.font('Helvetica-Bold')
                    doc.text(`total price of the order : $${totaltotal}`)
                    doc.end() ;
                }
                generateInovice(cart, order.cart.totalPrice , invoicePath)

            }))
            .catch(err => {
                next(err)
            })
            
        }

    })
    .catch(err => {
        err.httpStatusCode = 500 ;
        return next(err)
    })

}

const client = {productCSHop , clientCartGet , clientCartPost  
    , clientProductView , clientIndex , clientOrders ,
     prodcutDetails , clientProductCartDelete , createOrder , getInvoice} ;

export { client }

