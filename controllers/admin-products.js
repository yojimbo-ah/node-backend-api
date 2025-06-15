import {Product} from '../modules/product.js'


// functions of routes admin.js

const productCHome = (req , res , next) => {
    res.render('admin/add-product.ejs' , {productTitle : 'products page' 
        , title : 'product page' 
        , path : '/admin/home'}) ;
}

const productCproduct = (req , res , next) =>{
    const reqB = req.body ;
    Product.create({name : reqB.title , description : reqB.description 
    , price : reqB.price , image : reqB.image })
    .then(result => {
        console.log(result) ;
        res.redirect('/admin/home');
    })
    .catch(err => {
        console.log(err) ;
        res.status(500).send('Failed to add product');
    })

}

const adminProductsView = (req , res , next) => {
    Product.findAll()
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
    Product.findByPk(ID)
    .then(product => {
        res.render('admin/edit-product.ejs' , {product : product , title : 'hello' , path : 'wawa'}) ;
    }).catch(err => {
        console.log(err) ;
    })

}  
const adminProductEdit2 = (req , res , next) => {
    const reqB = req.body ;
    const productId = req.params.productId ;
    Product.update(
        {
            name : reqB.title ,
            image : reqB.image ,
            description : reqB.description ,
            price : reqB.price
        },
        {
            where : {
            id : productId
            }
        }
    )

    res.redirect('../../home');
}

const adminProductDelete = (req , res , next) => {
    const ID = req.params.productId ;
    Product.destroy({
        where : {
            id : ID
        } 
    }).then( () => {
         res.redirect('/admin/products-view');
        }
    ).catch(err => {
        console.log(err);
    })

}


const admin = {productCHome , productCproduct 
    , adminProductsView , adminProductEdit , adminProductDelete  ,
    adminProductEdit2} ;


export  { admin }
