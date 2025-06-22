import {Product} from '../modules/product.js'


// functions of routes admin.js

const productCHome = (req , res , next) => {
    res.render('admin/add-product.ejs' , {productTitle : 'products page' 
        , title : 'product page' 
        , path : '/admin/home'}) ;
}

const productCproduct = (req , res , next) =>{
    const reqB = req.body ;
    console.log(req.user);
    const userId = req.user._id ;
    let product = new Product(reqB.title , reqB.description , reqB.price , reqB.image , userId) ;
    product.save()
    .then(result => {
        res.redirect('/admin/home')
    })
    .catch(err => {
        console.log(err)
    })

}

const adminProductsView = (req , res , next) => {

    Product.fetchAll()
    .then(products => {
        res.render('admin/products-view.ejs' 
        , { products : products  , title : 'admin view' , path : '/admin/products-view'});
    })
    .catch(err => {
        console.log(err) ;
        res.status(500).send('Failed to open the page');
    })
}
const adminProductEdit = (req , res , next) =>{
    const ID = req.params.productId ;
    Product.findById(ID)
    .then(product => {
        res.render('admin/edit-product.ejs' , {product : product , title : 'hello' , path : 'wawa'}) ;
        console.log(product)
        
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
        image : reqB.image
    }
    Product.update(productId , options)
    .then(() => {
        res.redirect('/admin/products-view')
    })
    .catch(err => {
        console.log(err)
    })
}

const adminProductDelete = (req , res , next) => {
    const ID = req.params.productId ;
    Product.delete(ID)
    .then(() => {
        res.redirect('/admin/products-view');
    })
    .catch(err => {
        console.log(err)
    })
}


const admin = {productCHome , productCproduct 
    , adminProductsView , adminProductEdit , adminProductDelete  ,
    adminProductEdit2} ;


export  { admin }
