const User = require('../models/users');

exports.isAdmin = (req, res, next) => {
    try{
        User.findOne({_id: req.query.id}, async (err, user) =>{
            if(err || !user){
                return res.status(400).json({
                    err: 'User with that email does not exist. Please sign-up!'
                });
            }
            if(user.role === 0){
                return res.status(403).json({
                    err: "Admin resource: Access denied!"
                });
            }
            next();
    })
    }catch(err){
        res.status(500).send("Internal Server Error");
    }
    
}
