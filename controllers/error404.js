import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { title } from 'process';

// Get the equivalent of __filename and __dirname
const __filename = fileURLToPath(import.meta.url);  // Convert import.meta.url to file path
const __dirname = dirname(__filename);


const error404 =  ( req , res , next ) => {
    console.log(__dirname);
    res.status(404).render('notFound.ejs' , {title : 'error page' , path : ''})
}
const error500  = (error , req , res , next) => {
    const authenticated = req.session ? req.session.loggedIn : false
    res.status(500).render('500.ejs' , {title : 'error page' , path : '/500' , authenticated : authenticated})
}


export {error404 , error500} ;