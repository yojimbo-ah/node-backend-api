import fs from 'fs' ;
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { addNewItemToProduct } from './product.js';

const __filename = fileURLToPath(import.meta.url);  // Convert import.meta.url to file path
const __dirname = dirname(__filename);

const p = path.join(__dirname , '../data' , 'cart.json') ;

const cartItems = class cart {
    static addToCart(ID) {
        cartItems.fetchAll(cart => {
            const temp = cart.products.find(elem => {
                return elem.id === ID
            })
            if (!temp) {
                addNewItemToProduct.findById(ID , product =>{
                    cart.products.push({id : ID , price : product.price , quantity : 1}) ;
                    cart.totalPrice = Number(cart.totalPrice) + Number(product.price) ;
                    fs.writeFile(p , JSON.stringify(cart) , (err) => {
                        console.log(err) ;
                    })
                })
            } else {
                temp.quantity ++ ;
                cart.totalPrice = Number(cart.totalPrice) + Number(temp.price) ;
                fs.writeFile(p , JSON.stringify(cart) , (err) => {
                        console.log(err) ;
                    }) ;
            }
        })
        }
        static fetchAll(cb) {
            fs.readFile(p , (err , fileContent ) => {
                if (err || !fileContent.length) {
                    cb({products : [] , totalPrice : 0}) ;
                } else {
                    cb(JSON.parse(fileContent));
                }
            }) 
        }
        static delete (ID) {
            cartItems.fetchAll(cart => {
                const newCart = {products : [] , totalPrice : 0} ;
                newCart.products = cart.products.filter(elem => {
                    return elem.id !== ID ;
                })
                const deletedItem = cart.products.find(elem => {
                    return elem.id === ID ;
                })
                newCart.totalPrice = Number(cart.totalPrice) - Number(deletedItem.price) * Number(deletedItem.quantity) ;
                fs.writeFile(p , JSON.stringify(newCart) , (err) => {
                    console.log(err) ;
                })
            })
        }
}



/*const cartItems = class cart {
    constructor(id , quantity) {
        this.id = id ;
        this.quantity = quantity ;
    }
    addToCart () {
        fs.readFile(p , (err , fileContent) => {
            let cart = [] ;
            if (!err) {
                cart = JSON.parse(fileContent) ;
            }
            cart.push(this);
            fs.writeFile(p , JSON.stringify(cart) , (err) => {
                console.log(err);
            });
        })
    }
    static fetchAll(cb) {
        fs.readFile(p , (err , fileContent ) => {
            if (err) {
                cb([]) ;
            } else {
                cb(JSON.parse(fileContent));
            }
        }) 
    }
    static add (ID) {
        cartItems.fetchAll(currentCart => {
        const item = currentCart.find( elem => {
                return ID === elem.id ;
            })
        if (!item) {
            currentCart.push({id : ID , quantity : 1});
        } else {
            item.quantity ++ ;
        }
        fs.writeFile(p , JSON.stringify(currentCart) , (err) => {
            console.log(err) ;
        })
    })
    }
}
    */

export { cartItems }