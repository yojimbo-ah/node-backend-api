import fs from 'fs' ;
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the equivalent of __filename and __dirname
const __filename = fileURLToPath(import.meta.url);  // Convert import.meta.url to file path
const __dirname = dirname(__filename);

const p = path.join(__dirname , '../data' , 'products.json') ;

const addNewItemToProduct = class product {
        constructor(title , image , price , description , id) {
            this.title = title ;
            this.image = image ;
            this.price = price ; 
            this.description = description ;
            this.id = id ;
        }

        addToProducts () {
            fs.readFile(p , (err , fileContent) => {
                let products =[] ;
                if (!err) {
                    products = JSON.parse(fileContent) ;
                }
                this.id = Math.random().toString() ;
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
                    cb(JSON.parse(fileContent));
                }
            }) 
        }
        static delete (id) {
            let newProducts = [] ;
            addNewItemToProduct.fetchAll( products => {
                newProducts = products.filter(p => {
                    return p.id !== id ;
                })
                fs.writeFile(p , JSON.stringify(newProducts) ,(err) => {
                console.log(err) ;
            });
            })

        }
        static findById (id , cb) {
            this.fetchAll((products) => {
                const p = products.find( element => {
                    return element.id === id
                })
                cb(p);
        }) 
    }
    static edit (ID , cb) {

    }
}

export  {addNewItemToProduct}