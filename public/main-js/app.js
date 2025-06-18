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
import { Order } from '../../modules/order.js';
import { OrderItem} from '../../modules/order-item.js'

// imported controller functions 
import { error404 } from '../../controllers/error404.js';


const app = express() ;

// realations and associations :
// user has many products and product has one user :
Product.belongsTo(User , {constraints : true , onDelete : 'CASCADE' }) ;
User.hasMany(Product , {constraints : true , onDelete : 'CASCADE' });

//user has one cart and cart has many items :

User.hasOne(Cart) ;
Cart.belongsTo(User) ;
// cart has many items and many items are in cart :

Cart.belongsToMany(Product , {through : CartItem});
Product.belongsToMany(Cart , {through : CartItem})

// user can have many orders but order can belong to one user
Order.belongsTo(User , {constraints : true , onDelete : 'CASCADE'});
User.hasMany(Order , {constraints : true  , onDelete : 'CASCADE'});

// same product can belong to diffrent orders and orders can have many products
Order.belongsToMany(Product , {through : OrderItem});
Product.belongsToMany(Order , {through : OrderItem});


sequelize.sync()
.then(result => {
    User.findByPk(1)
    .then(user => {
        if (!user) {
            return User.create({name : 'ahmed' , age : 19 , email : 'abbad.ahmed.gg@gmail.com'})
        }
        return user
    })
    .then(user => {
        user.getCart()
        .then(carts => {
            if(carts === null) {
                user.createCart()
            }
        })
        .catch(err => {
            console.log(err)
        })
    })
    .catch(err => {
        console.log(err)
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






