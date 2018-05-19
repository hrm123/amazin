const router = require('express').Router();
const jwt = require('jsonwebtoken');
const async = require('async');

const Category = require('../models/category');
const Product  = require('../models/product');
const Review  = require('../models/review');
const config = require('../config');
const checkJWT = require('../middlewares/check-jwt');
const configKeys = require('../configKeys');
const algoliasearch = require('algoliasearch');
const client = algoliasearch(configKeys.appId, configKeys.apiKey);
const index = client.initIndex('amazinv1');


router.get('/', (req,res,next) => {
    // console.log(req);

    if(req.query.query) {
        index.search({
            query: req.query.query,
            page: req.query.page
        }, (err, content) => {
            res.json({
                success: true,
                message: "results:",
                status: 200,
                content: content,
                search_result : req.query.query
            });
        });
    }
    else {
        index.search({
            page: req.query.page
        }, (err, content) => {
            res.json({
                success: true,
                message: "results:",
                status: 200,
                content: content,
                search_result : req.query.query
            });
        });

    }
});

module.exports = router;