
import {Product} from '../modules/product.js'
import { User } from '../modules/user.js';

// functions of routes admin.js

const productCHome = (req , res , next) => {
    let authenticated = req.session.loggedIn ;
    res.render('admin/add-product.ejs' , {productTitle : 'products page' 
        , title : 'product page' 
        , path : '/admin/home' 
        , authenticated : authenticated
    }) ;
}

const productCproduct = (req , res , next) =>{
    const reqB = req.body ;
    let product = new Product({name : reqB.title , description : reqB.description , price : reqB.price , image : reqB.image , userId : req.session.userId}) ;
    product.save()
    .then(result => {
        console.log('product has been created');
        res.redirect('/admin/home')
    })
    .catch(err => {
        console.log(err)
    })

}

const adminProductsView = (req , res , next) => {
    Product.find({userId : req.session.userId})
    .then(products => {
        let authenticated = req.session.loggedIn ;
        res.render('admin/products-view.ejs' 
        , { products : products  , title : 'admin view' , path : '/admin/products-view' , authenticated : authenticated});
    })
    .catch(err => {
        console.log(err) ;
        res.status(500).send('Failed to open the page');
    })
}
const adminProductEdit = (req , res , next) =>{
    const ID = req.params.productId ;
    const userId = req.session.userId ;
    Product.findOne({_id : ID , userId : userId})
    .then(product => {
        if (product) {
            let authenticated = req.session.loggedIn ;
            res.render('admin/edit-product.ejs' , {product : product , title : 'hello' , path : 'wawa' , authenticated : authenticated}) ;
            console.log(product)
        } else {
            res.redirect('/admin/products-view');
        }

        
    }).catch(err => {
        console.log(err) ;
    })

}  
const adminProductEdit2 = (req , res , next) => {
    const reqB = req.body ;
    const productId = req.params.productId ;
    const options = {
        name : reqB.title ,
        description : reqB.description ,
        price : reqB.price ,
        image : reqB.image ,
    }
    Product.updateOne({_id : productId} , options)
    .then(() => {
        res.redirect('/admin/products-view')
    })
    .catch(err => {
        console.log(err)
    })
}

const adminProductDelete = (req , res , next) => {
    const ID = req.params.productId ;
    const userId = req.session.userId ;
    Product.findOne({_id : ID , userId : userId})
    .then(product => {
        if (product) {
            product.deleteOne()
            .then(() => {
                res.redirect('/admin/products-view')
            })
        } else {
            res.redirect('/admin/products-view')
        }
    })
    .catch(err => {

    })

}


const admin = {productCHome , productCproduct 
    , adminProductsView , adminProductEdit , adminProductDelete  ,
    adminProductEdit2} ;


export  { admin }
