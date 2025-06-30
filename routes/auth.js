import express from 'express'
import { authen } from '../controllers/authen.js'
import {body, check} from 'express-validator'
import { User } from '../modules/user.js'
import { Product } from '../modules/product.js'

const authRouter = express.Router()


authRouter.get('/login', authen.getLogin);

authRouter.post('/login' , 
    [
        body('email').isEmail().withMessage('add a valid email')
        .custom((value) => {
            return new Promise((resolve , reject) => {
                User.findOne({email : value})
                .then(user => {
                    if (user) {
                        resolve(true)
                    } else {
                        reject(new Error(`can't find a user with the same email , try another one`));
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            })
        }) ,
        body('password').trim().notEmpty().withMessage('the password cant be empty')
        .isLength({min : 8}).withMessage('password must be at least 8 characters')
    ]
    , authen.postLogin);

authRouter.post('/logout',authen.postLogout);

authRouter.get('/signup' , authen.getSignUp);

authRouter.post('/signup' , 
    [
        body('email').isEmail().withMessage('enter a valid email')
        .custom((value) => {
            return new Promise((resolve , reject) => {
                User.findOne({email : value})
                .then(user => {
                    if (user) {
                        reject(new Error('there exit a user with email , try another one'))
                    } else {
                        resolve(true)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            })
        }) ,
        body('password').isLength({min : 8 , max : 20}).withMessage('password must be at least 8 charachters')
        .isStrongPassword({
            minLowercase : 1 ,
            minUppercase : 1 ,
            minNumbers : 1 ,
            minSymbols : 1
        }).withMessage('password must contain at leasst one uppercase and lowercase character , number , symbol') ,
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

authRouter.post('/reset' , [
        body('email').isEmail().withMessage('add a valid email')
        .custom((value) => {
            return new Promise((resolve , reject) => {
                User.findOne({email : value})
                .then(user => {
                    if (user) {
                        resolve(true)
                    } else {
                        reject(new Error('cant find a user with the same emeil , try another one'))
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            })

        })
    ]  
 , authen.postReset);

authRouter.get('/reset/:resetToken' , authen.getResetToken);

authRouter.post('/resetPassword/:userId/:token', [
    body('password').trim().isLength({min : 8 , max : 20}).withMessage('password must be at least 8 characters')
    .isStrongPassword({
        minLowercase : 1 ,
        minUppercase : 1 ,
        minNumbers : 1 ,
        minSymbols : 1
    }).withMessage('password must contain at least one uppercase and lowercase character , number and symbol') ,
    body('confirmpassword').custom((value , {req}) => {
        return new Promise((resolve , reject) => {
            if (value === req.body.password) {
                resolve(true)
            } else {
                reject(new Error('confirm password doesnt match the password'))
            }
        })
    })
]
, authen.postResetPassword);

export { authRouter }