
import {Product} from '../modules/product.js'
import { User } from '../modules/user.js';
import { validationResult } from 'express-validator';
import multer from 'multer';
import fs from 'fs/promises'


import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// functions of routes admin.js

const productCHome = (req , res , next) => {
    let authenticated = req.session.loggedIn ;
    res.render('admin/add-product.ejs' , {productTitle : 'products page' 
        , title : 'product page' 
        , path : '/admin/home' 
        , authenticated : authenticated
        , errors : null 
        , oldInputs : null
    }) ;
}

const productCproduct = (req , res , next) =>{
    const errors = validationResult(req)
    const image = req.file ;
    let authenticated = req.session.loggedIn ;
    console.log(authenticated)
    if (!image) {
        res.status(422).render('admin/add-product.ejs' , {
            oldInputs : req.body , title : 'product page' , path : '/admin/product' , authenticated : authenticated , 
            errors : 'cant attatch a file that isnt a pnj jpg jpeg'
        })
    } else {
        const imagePath = image.path.replace('\\' , '/')
        if (!errors.isEmpty()) {
            fs.unlink(imagePath)
            .then(result => {
                res.render('admin/add-product.ejs' , {oldInputs : req.body , title : 'product page' , path : '/admin/home' , authenticated : authenticated , 
                    errors : errors.array()[0].msg
                })
            })
            .catch(err => {
                return next(err)
            })
        } else {
            const reqB = req.body ;
            console.log(image)
            let product = new Product({name : reqB.name , description : reqB.description , price : reqB.price ,
                image : imagePath , userId : req.user._id}) ;
            product.save()
            .then((result) => {
                console.log('product has been created');
                res.redirect('/admin/home')
            })
            .catch(err => {
                err.httpStatusCode = 500 ;
                return next(err)
            })
        }

    }
}

const adminProductsView = (req , res , next) => {
    Product.find({userId : req.session.userId})
    .then(products => {
        let authenticated = req.session.loggedIn ;
        res.render('admin/products-view.ejs' 
        , { products : products  , title : 'admin view' , path : '/admin/products-view' , authenticated : authenticated});
    })
    .catch(err => {
           err.httpStatusCode = 500 ;
            return next(err)
    })
}

const adminProductEdit = (req , res , next) =>{
    const ID = req.params.productId ;
    const userId = req.user._id ;
    const authenticated  = req.session.loggedIn ;
    console.log(ID)
    console.log(userId)
    console.log(authenticated)
    Product.findOne({_id : ID , userId : userId})
    .then(product => {
        if (product) {
            console.log(product)
            res.render('admin/edit-product.ejs' , {product : product , title : 'hello' , path : 'wawa' , authenticated : authenticated , errors : null}) ;
        } else {
            res.redirect('/admin/products-view');
        }
    }).catch(err => {
           err.httpStatusCode = 500 ;
            return next(err)
    })
}  

const adminProductEdit2 = (req , res , next) => {
    const authenticated = req.session.loggedIn
    const errors = validationResult(req) ;
    const image = req.file ;
    if (!errors.isEmpty()) {
        res.render('admin/edit-product.ejs' , {product : req.body , title : 'product edit page' , path : 'wawa' , authenticated : authenticated ,
             errors : errors.array()[0].msg , productId : req.params.productId})
    } else {
        const reqB = req.body ;
        const productId = req.params.productId ;
        let options ;
        if (image) {
            options = {
            name : reqB.name ,
            description : reqB.description ,
            price : reqB.price ,
            image : image.path ,
            }
        } else {
            options = {
                name : reqB.name ,
                description : reqB.description ,
                price : reqB.price ,
            } 
        }
        Product.findOne({_id : productId})
        .then(product => {
            if (image) {
                fs.unlink(product.image)
                .then(result => {
                    product.name = options.name ;
                    product.description = options.description ;
                    product.price = options.price ;
                    product.image = options.image ;
                    product.save()
                    .then(result => {
                        res.redirect('/admin/products-view')
                    })
                    .catch(err => {
                        return next(err)
                    })
                })
                .catch(err => {
                    return next(err)
                })
            } else {
                    product.name = options.name ;
                    product.description = options.description ;
                    product.price = options.price ;
                    product.save()
                    .then(result => {
                        res.redirect('/admin/products-view')
                    })
                    .catch(err => {
                        return next(err)
                    })
            }
        })
        .catch(err => {
            return next(err)
        })

    }
}

const adminProductDelete = (req , res , next) => {
    const ID = req.params.productId ;
    const userId = req.user._id ;
    console.log(1)
    Product.findOne({_id : ID , userId : userId})
    .then(product => {
        console.log(2)
        if (product) {
            fs.unlink(product.image)
            .then(() => {
                product.deleteOne()
                .then(() => {
                    res.status(200).json({nessage : 'product has been deleted'})
                })
            })
            .catch(err => {
                res.status(500).json({message : 'error cant delete product'})
            })

        } else {
            res.redirect('/admin/products-view')
        }
    })
    .catch(err => {
           err.httpStatusCode = 500 ;
            return next(err)
    })

}


const admin = {productCHome , productCproduct 
    , adminProductsView , adminProductEdit , adminProductDelete  ,
    adminProductEdit2} ;


export  { admin }
