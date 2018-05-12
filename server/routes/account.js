const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    console.log('signup');
    console.log(req.body);
});

router.get('/testsignup', (req, res, next) => {
    console.log('testsignup');
    return {
        name: 'ram'
    }
});

module.exports = router;
