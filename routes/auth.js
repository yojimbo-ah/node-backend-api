import express from 'express'
import { authen } from '../controllers/authen.js'
import {body, check} from 'express-validator'
const authRouter = express.Router()


authRouter.get('/login', authen.getLogin);
authRouter.post('/login' , 
    [
        body('email').isEmail().withMessage('add a valid email') ,
        body('password').isLength({min : 6}).withMessage('password must be at least 6 characters')
    ]
    , authen.postLogin);
authRouter.post('/logout',authen.postLogout);
authRouter.get('/signup' , authen.getSingUp);

authRouter.post('/signup' , 
    [
        body('email').isEmail().withMessage('enter a valid email') ,
        body('password').isLength({min : 6 , max : 20}).withMessage('password must be at least 6 charachters') ,
        body('age').custom((value) => {
            const age = parseInt(value , 10) ;
            return new Promise((resolve , reject) => {
                if (age >= 100) {
                    reject(new Error('age must be less then 100'))
                } else if (age < 18) {
                    reject(new Error('age must be greater then 18'))
                } else {
                    resolve(true)
                }
            }) 
            }
        ) ,
        body('confirmpassword').custom((value , {req}) => {
            return new Promise((resolve , reject) => {
                if (value === req.body.password) {
                    resolve(true)
                } else {
                    reject(new Error('confirmation password doesnt match the password'))
                }
            })
        })

    ]
 , authen.postSignUp);

authRouter.get('/reset' , authen.getReset);
authRouter.post('/reset' , authen.postReset);
authRouter.get('/reset/:resetToken' , authen.getResetToken);
authRouter.post('/resetPassword/:userId/:token' , authen.postResetPassword);

export { authRouter }