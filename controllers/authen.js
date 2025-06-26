import { User } from "../modules/user.js";
import bcrypt from 'bcrypt' ;
import nodemailer from 'nodemailer' ;
import crypto from 'crypto'; 
import { validationResult } from "express-validator";

const transporter = nodemailer.createTransport({
    service : 'gmail' ,
    auth : {
        user : 'abbad.ahmed.gg@gmail.com' ,
        pass : 'gjnk auht okyb sclv'
    }
})
const getLogin = (req , res , next ) => {
    let authenticated = req.session.loggedIn ;
    res.render('auth/login.ejs' , {path : '/login' , title : 'login page'  , authenticated : authenticated , errorMessage : req.flash('error'), successMessage : req.flash('success')
        , errorMessage : req.flash('error') , successMessage : req.flash('success')
     })
}

const postLogin = (req , res , next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(errors) ;
        res.render('auth/login.ejs' , {path : '/login' , title : 'login page' , oldInputs : req.body , authenticated : false , errors : errors.array()[0]})
    } else {
        const email  = req.body.email ;
        const password = req.body.password ;
        User.findOne({email : email})
        .then(user => {
            if (user) {
                console.log('user found')
                bcrypt.compare(password , user.password)
                .then(match => {
                    if (match) {
                        console.log('correct password')
                        req.session.loggedIn = true ;
                        req.session.userId = user._id ;
                        req.session.save((err)=>{
                            res.redirect('/shop')
                        }) 
                    } else {
                        console.log('incorrect password')
                        req.flash('error' , 'incorrect password')
                        res.redirect('/login')
                    }
                })
            } else {
                console.log('there is no user with that email');
                req.flash('error' , 'there is no user with that email')
                res.redirect('/singup')
            }
        })
    }

}
const postLogout = (req , res , next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}
const getSingUp = (req , res , next ) => {
    res.render('auth/signup.ejs' , {path : '/login' , title : 'login page'  ,
         authenticated : false , path : '/signup' , errorMessage : req.flash('error') , successMessage : req.flash('success') 
         ,oldInputs : false })
}

const postSignUp = (req , res , next) => {
    const errors = validationResult(req) ;
    if (!errors.isEmpty()) {
        console.log(errors)
        res.render('auth/signup.ejs' , {path : '/signup' , title : 'signup page' , errorMessage : errors.array()[0].msg , 
            oldInputs : req.body , validationErrors : errors.array() , authenticated : false
        })
    } else {
        const email = req.body.email ;
        const password = req.body.password ;
        const confirmPassword = req.body.confirmpassword ;
        const name = req.body.name ;
        const age = req.body.age ;
        User.findOne({email : email})
        .then(user => {
            if (user) {
                console.log(user)
                console.log('the email is already used')
                req.flash('error' , 'there exit a user with the email')
                res.redirect('/login')
            } else {
                console.log('creating user') ;
                if (password === confirmPassword) {
                    bcrypt.hash(password , 12)
                    .then(hashedPassword => {
                        let newUser = new User({
                            name : name ,
                            email : email ,
                            age : age ,
                            cart : {
                                totalPrice : 0 ,
                                products : []
                            } ,
                            password : hashedPassword
                        })
                        newUser.save()
                        .then(() => {
                            transporter.sendMail({
                                from :'abbad.ahmed.gg@gmail.com',
                                to : email ,
                                subject :'account creation' ,
                                html : '<p> account has been created</p>'
                            })
                            .then(result => {
                                console.log('email sent :' , result)
                                req.flash('success' , 'user has been created , login into your account')
                                res.redirect('/login')
                                })
                            .catch(err => {
                                console.log(err) ;
                            })
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
                } else {
                    console.log('passwords doesnt match');
                    req.flash('error' , 'passwords doesnt match make sure your confirmation password is correct')
                    res.redirect('/signup')
                }
            }
        })
    }
    
}

const getReset = (req , res , next) => {
    res.render('auth/reset.ejs' , {title : 'password reset' , path : '/reset' , authenticated : false , errorMessage : req.errorMessage , successMessage : req.successMessage})
}
const postReset = (req , res , next) => {
    crypto.randomBytes(32 , (err , buffer) => {
        if (err) {
            console.log(err) ;
            res.redirect('/reset')
        } else {
            const token = buffer.toString('hex') ;
            User.findOne({email : req.body.email})
            .then(user => {
                if (!user) {
                    req.flash('error' , 'cant find user with email create a new user')
                    res.redirect('/signup')
                } else {
                    user.resetToken = token ;
                    user.tokenExpDate = Date.now() + 600000 ;
                    user.save()
                    .then(result => {
                        transporter.sendMail({
                            from : 'abbad.ahmed.gg@gmail.com' ,
                            to : req.body.email ,
                            subject : 'reset account' ,
                            html : `
                            <p>this is a request for reseting your email password</P>
                            <p>click here to reset it : <a href="http://localhost:3000/reset/${token}">click me </a>"
                            `
                        })
                        req.flash('success' , 'reset email was sent to your inbox')
                        res.redirect('/reset');
                    })
                    .catch(err => {
                        console.log(err)
                    })

                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    })
}
const getResetToken = (req , res , next ) => {
    const resetToken = req.params.resetToken ;
    User.findOne({resetToken : resetToken})
    .then(user => {
        if (user) {
            const date = new Date(user.tokenExpDate) ;
            const now = new Date();
            if (date > now) {
                console.log('changing')
                req.flash('success' , 'you can change your password on this page')
                res.render('auth/passwordReset.ejs' , {title : 'password confirmation' , path : '/confirmpassword ' , authenticated : false , 
                    errorMessage : req.errorMessage , successMessage : req.successMessage , userId : user._id , token : resetToken
                })
            } else {
                console.log('token has expired');
                req.flash('error' , 'the token has expired')
                res.redirect('/reset');
            }
        } else {
            req.flash('error' , 'there is no user with this token');
            res.redirect('/reset')
        }
    })
    .catch(err => {
        console.log(err)
    })

}
const postResetPassword = (req , res , next) => {
    const password = req.body.password ;
    const confirmPassword = req.body.confirmPassword ;
    const id = req.params.userId ;
    const token = req.params.token ;
    console.log(id)
    if (password === confirmPassword) {
        User.findOne({_id : id})
        .then(user => {
            if (user) {
                bcrypt.hash(password , 12)
                .then(hashedPassword => {
                    user.password = hashedPassword ;
                    user.save()
                    .then(result => {
                        req.flash('success', 'password has been reseted');
                        res.redirect('/login')
                    })
                    .catch(err => {
                        console.log(err)
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            } else {
                console.log('am here')
                req.flash('error','cant find the user')
                res.redirect('/reset')
            }
        })
        .catch(err => {
            console.log(err)
        })
    } else {
        req.flash('error' , 'confirmation password doesnt match the new passowrd , try agian');
        res.redirect(`/reset/${token}`);
    }
}


const authen = { getLogin , postLogin , postLogout , getSingUp 
    , postSignUp , getReset , postReset , getResetToken , postResetPassword}

export { authen } 