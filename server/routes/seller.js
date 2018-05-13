const router = require('express').Router();
const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const faker = require('faker');

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
.get(checkJWT, (req, res, next)=> {
    Product.find({
        owner: req.decoded.user._id
    })
    .populate('owner') // will get complete details of owner also
    .populate('category')
    .exec((err, products) => {
        if(err){
            res.json({
                success: false,
                message: 'Failed'
            });
        } else {
            res.json({
                success: true,
                message: 'success',
                products: products
            });
        }
    });
})
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

/* TODO uncomment for non esting */
router.get('/faker/test/', (req, res, next) => {
    for(i=0;i<2000;i++){
        let product = new Product();
        product.owner = '5af81eb1c16c90390c9c0608';
        product.category = '5af81f6ec16c90390c9c0609';
        product.title = faker.commerce.productName();
        product.description = faker.lorem.words();
        product.price = faker.commerce.price();
        product.image = faker.image.cats();
        product.save();
    }
    res.json({
        success: true,
        message: 'Successfully added 2000 products'
    });
});

module.exports = router;



