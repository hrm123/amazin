const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config');

router.post('/signup', (req, res, next) => {
//     console.log('signup');
    console.log(req.body);
    User.findOne({email: req.body.email}, (err, user1) =>{
        if(user1){
            res.json({
                success: false,
                message: 'Account with that email already exists'
            });
        }
        else  {
            let user = new User();
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.picture = req.body.picture;
            user.isSeller = req.body.isSeller;

            user.save();
            var token = jwt.sign({
                user: user
            }, config.secret, {
                expiresIn: '7d'
            });
            res.json({
                success: true,
                message: 'Enjoy your token',
                token: token
            })
        }
    });
});

router.get('/testsignup', (req, res, next) => {
    console.log('testsignup');
    return {
        name: 'ram'
    }
});


router.post('/login', (req, res, next) => {
    
    User.findOne({email: req.body.email}, (err, user) => {
        if(err){ 
            console.log('signin error');
            console.log(err);
            throw err;
        }

        if(!user) {
            res.json({
                success: false,
                message: 'Authentication failed, user not found'
            });
        } else if(user) {
            console.log('req.body.password',req.body.password);
            var validPassword = user.comparePassword(req.body.password);
            if(!validPassword){
                res.json({
                    success: false,
                    message: 'Authentication failed. Wrong password'
                });
            } else {
                var token = jwt.sign({
                    user: user
                }, config.secret, {
                    expiresIn: '7d'
                });
                res.json({
                    success: true,
                    message: "Enjoy your token",
                    token: token
                });
            }
        }
    });
});

module.exports = router;
