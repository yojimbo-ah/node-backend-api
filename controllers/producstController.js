
const homePage =  (req , res , next) => {
    res.render('product.ejs' , {productTitle : 'products page' 
        , title : 'product page' 
        , path : '/admin/home'}) 
} ;

const productPage =  (req , res , next) =>{
    products.push({title : req.body.title});
    res.redirect('/');
} ;

const prodcutController = {homePage , productPage}





export { prodcutController } ;