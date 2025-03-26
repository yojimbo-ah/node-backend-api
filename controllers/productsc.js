const products = [] ;

// functions of routes admin.js

const productCHome = (req , res , next) => {
    res.render('product.ejs' , {productTitle : 'products page' 
        , title : 'product page' 
        , path : '/admin/home'}) ;
}
const prodcutCproduct = (req , res , next) =>{
    products.push({title : req.body.title});
    res.redirect('/');
}

// functions of routes shop.js
const productCSHop = (req , res , next) => {
    console.log('your products : ' , products) ;
    res.render('shop.ejs' , { products : products  , title : 'shop page' , path : '/'});
}

// functions of notFound.js 








export  { productCHome , prodcutCproduct ,productCSHop }