const router = require('express').Router();
const jwt = require('jsonwebtoken');

const Category = require('../models/category');
const config = require('../config');
const checkJWT = require('../middlewares/check-jwt');

router.route('/categories')
.get( checkJWT, (req, res, next) => {
    Category.find({}, (err,categories) => {
        if(err){
            // console.log(err);
            res.json({
                success: false,
                message: 'Failed'
            });
        } else {
        res.json({
            success: true,
            message: 'Success',
            categories: categories
        });
    }
    });
})
.post(checkJWT, (req, res, next) => {
    let category = new Category();
    // console.log('add cat', req.body);
    category.name = req.body.name;
    try{
    category.save( (err, cat) => {
        if(err){
            // console.log(err);
            res.json({
                success: false,
                message: 'Failed'
            });
        } else {
            res.json({
                success: true,
                message: 'Successful'
            });
        }
    });
    
}
catch(err){
    res.json({
        success: false,
        message: err
    });
}
});

module.exports = router;
