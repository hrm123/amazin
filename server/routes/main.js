const router = require('express').Router();
const jwt = require('jsonwebtoken');
const async = require('async');

const Category = require('../models/category');
const Product  = require('../models/product');
const config = require('../config');
const checkJWT = require('../middlewares/check-jwt');

router.get('/test', (req,res, next) =>{
    function n1(callback){
        console.log(`n1 started`);
        callback(null, "firstname");
        console.log(`n1 complete`);
    }
    function n2(firstName, callback){
        console.log(`n2 started`);
        var lastName = "lastname";
        console.log(`n2: ${firstName},${lastName}`);
        console.log(`n2 complete`);
    }

   async.waterfall([n1,n2]);
});

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


router.get('/categories1/:id', (req, res, next) => { // use the below verswion that ie optimized for paging
    const perPage = 20;
    Product.find({category: req.params.id}) //ex: id can be 'books'
    .populate('category')
    .exec((err, products) => {
        if(err){
            res.json({
                success: false,
                message: err});
        } else {
            Product.count({category: req.params.id}, (err, totalProducts) => {
                if(err){
                    res.json({
                        success: false,
                        message: err});
                } else {
                    res.json({
                        success: true,
                        message: 'category',
                        products: products,
                        categoryName: products.length>0 ? products[0].category.name : '',
                        totalProducts: totalProducts,
                        pages: Math.ceil(totalProducts / perPage)
                    });
                }
            });
        }
    });
});

router.get('/categories2/:id', (req, res, next) => {
    const perPage = 20;
    const page = req.query.page;
    async.waterfall([ // to call three aysnc functions one after another - user parallel version given below
        function(callbackOnGetTotalProducts){
            Product.count({category: req.params.id}, (err, totalProducts) => {
                callbackOnGetTotalProducts(err, totalProducts);
            });
        },
        function(totalProducts, callback) {
            Product.find({category: req.params.id})
            .skip(perPage * page)
            .limit(perPage)
            .populate('category')
            .populate('owner')
            .exec((err, products)=>{
                if(err) return next(err);
                callback(err, products, totalProducts);
            });
        },
        function(products, totalProducts, callback){
            Category.findOne({_id: req.params.id}, (err, category) => {
                res.json({
                    success: true,
                    message: 'category',
                    products: products,
                    categoryName: category.name,
                    totalProducts: totalProducts,
                    pages: Math.ceil(totalProducts / perPage)                
                });
            });
        }
    ]);      
});

router.get('/categories/:id', (req, res, next) => {
    const perPage = 20;
    const page = req.query.page;
    async.parallel([ // to call three aysnc functions one after another - user parallel version given below
        function(callbackOnGetTotalProducts){
            Product.count({category: req.params.id}, (err, totalProducts) => {
                callbackOnGetTotalProducts(err, totalProducts);
            });
        },
        function(callback) {
            Product.find({category: req.params.id})
            .skip(perPage * page)
            .limit(perPage)
            .populate('category')
            .populate('owner')
            .exec((err, products)=>{
                if(err) return next(err);
                callback(err, products);
            });
        },
        function(callback){
            Category.findOne({_id: req.params.id}, (err, category) => {
                callback(err, category);
            });
        }
    ], function(err, results) {
        var totalProducts = results[0];
        var products = results[1];
        var category = results[2];
        res.json({
            success: true,
            message: 'category',
            products: products,
            categoryName: category.name,
            totalProducts: totalProducts,
            pages: Math.ceil(totalProducts / perPage)                
        });
    });      
});


router.get('/products', (req, res, next) => {
    const perPage = 20;
    const page = req.query.page;
    async.parallel([ // to call three aysnc functions one after another - user parallel version given below
        function(callbackOnGetTotalProducts){
            Product.count({}, (err, totalProducts) => {
                callbackOnGetTotalProducts(err, totalProducts);
            });
        },
        function(callback) {
            Product.find({})
            .skip(perPage * page)
            .limit(perPage)
            .populate('category')
            .populate('owner')
            .exec((err, products)=>{
                if(err) return next(err);
                callback(err, products);
            });
        }
    ], function(err, results) {
        var totalProducts = results[0];
        var products = results[1];
        res.json({
            success: true,
            message: 'category',
            products: products,
            totalProducts: totalProducts,
            pages: Math.ceil(totalProducts / perPage)                
        });
    });      
});

router.get('/product/:id',(req, res, next)=> {
    console.log(req.params.id);
    Product.findById({_id: req.params.id})
    .populate('category')
    .populate('owner')
    .exec((err, product)=> {
        if(err) {
            res.json({
                success: false,
                message: 'Product is not found'
            });
        } else {
            res.json({
                success: false,
                message: 'Product is found',
                product: product
            });           
        }
    });

});

module.exports = router;
