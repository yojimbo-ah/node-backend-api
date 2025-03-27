import fs from 'fs' ;
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the equivalent of __filename and __dirname
const __filename = fileURLToPath(import.meta.url);  // Convert import.meta.url to file path
const __dirname = dirname(__filename);

const p = path.join(__dirname , '../data' , 'products.json') ;

const addNewItemToProduct = class product {
        constructor(title) {
            this.title = title
        }

        addToProducts () {
            fs.readFile(p , (err , fileContent) => {
                let products =[] ;
                if (!err) {
                    products = JSON.parse(fileContent) ;
                }
                products.push(this)
                fs.writeFile(p , JSON.stringify(products) ,(err) => {
                    console.log(err) ;
                } );
            })
        }
        static fetchAll(cb) {
            fs.readFile(p , (err , fileContent ) => {
                if (err) {
                    cb([]) ;
                } else {
                    cb(JSON.parse(fileContent)) ;
                }
            }) 
        }
    }

export {addNewItemToProduct}