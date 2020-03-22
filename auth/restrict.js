function restrict(role){

    return( req, res, next ) => {
        //if token exists and the role matches the role in the database then let the user procede to log in
        if (req.token && req.token.userRole === role) {
    
        next()
        
        //if THE USER IS A HACKER THEN KICK THAT HACKER OUTA HEA!
        } else {
            return res.status(403).json({
                message:"You are not allowed here"
            })
        }
    }
}

module.exports = restrict