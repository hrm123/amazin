const router = require('express').Router();
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');


const Category = require('../models/category');
const Product = require('../models/product');
const config = require('../config');
const configKeys = require('../configKeys');
const checkJWT = require('../middlewares/check-jwt');
const s3 = new aws.S3({accessKeyId: configKeys.accessKeyId , secretAccessKey: configKeys.secretAccessKey  });

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket:'amazinwebapp',
        metadata: function(req, file, cb){
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
          }
    })
});


router.route('/products')
.get()
.post([checkJWT, upload.single('product_picture')], (req, res, next)=> {
    let product = new Product();
    product.owner = req.decoded._id;
    product.category = req.body.categoryId;
    product.title = req.body.title;
    product.price = req.body.price;
    product.description = req.body.description;
    product.image = req.file.location;
    product.save((err, prod)=> {
        if(err){
            res.json({
                success: false,
                message: 'Failed'
            });
        } else {
            res.json({
                success: true,
                message: 'Successfully added the product',
                product: prod
            });
        }

    });

});


module.exports = router;



