const isAuth = (req , res , next) => {
    if (!req.session.loggedIn){
        res.redirect('/login')
    } else {
        next()
    }
}

export {isAuth}