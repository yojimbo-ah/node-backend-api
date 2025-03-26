import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the equivalent of __filename and __dirname
const __filename = fileURLToPath(import.meta.url);  // Convert import.meta.url to file path
const __dirname = dirname(__filename);


const error404 =  ( req , res , next ) => {
    console.log(__dirname);
    res.status(404).render('notFound.ejs' , {title : 'error page' , path : ''})
}


export {error404} ;