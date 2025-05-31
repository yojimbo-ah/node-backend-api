import fs from 'fs' ;
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);  // Convert import.meta.url to file path
const __dirname = dirname(__filename);

const p = path.join(__dirname , '../data' , 'cart.json') ;
const cartItems = class cart {
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
        })
    }
}