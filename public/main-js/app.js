import http from 'http' ;
import express from 'express' ;
import bodyParser from 'body-parser' ;
import path from 'path' ;

import sequelize from '../../utils/database.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the equivalent of __filename and __dirname
const __filename = fileURLToPath(import.meta.url);  // Convert import.meta.url to file path
const __dirname = dirname(__filename);

// imoported middleware functions
import { routerAdmin  } from '../../routes/admin.js' ;
import { routerShop } from '../../routes/shop.js';

// modules

import { Product } from '../../modules/product.js';
import { User } from '../../modules/user.js';
import { CartItem } from '../../modules/cart-item.js';
import { Cart } from '../../modules/cart.js';

// imported controller functions 
import { error404 } from '../../controllers/error404.js';


const app = express() ;

// realations and associations :
// user has many products and product has one user :
Product.belongsTo(User , {constraints : true , onDelete : 'CASCADE'}) ;
User.hasMany(Product);
//user has one cart and cart has many items :
User.hasOne(Cart) ;
Cart.belongsTo(User) ;




sequelize.sync()
.then(result => {
    User.findByPk(1)
    .then(user => {
        if (!user) {
            User.create({name : 'ahmed' , age : 19 , email : 'abbad.ahmed.gg@gmail.com'})
        }
    })

    app.listen(3000) ;
}).catch(err => {
    console.log(err) ;
})

app.set('view engine' , 'ejs');
app.set('views' , 'views')


app.use(bodyParser.urlencoded({extended : false})) ;
app.use(express.static(path.join(__dirname , '../../public'))) ;

// the router countains are middlewares :
app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user ;
        next() ;
    })
    .catch(err => {
        console.log(err) ;
    })
}) ;


app.use('/admin' , routerAdmin ) ;
app.use('/' , routerShop ) ;
app.use('/' , error404);






