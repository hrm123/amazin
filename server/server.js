const express = require('express'); // to create http routes
const morgan = require('morgan'); // http request logger for nodejs
const bodyParser = require('body-parser'); // data reader
const mongoose  = require('mongoose'); // mongo db agent
const cors = require('cors');

const config = require('./config');
const app = express();

mongoose.connect(config.database, (err) => {
    if(err){
        console.log(err);
    }
    else {
        console.log('connected to database.');
    }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cors); // any API call from UI will not have domain issues

app.get('/', (req,res,next) => {
    res.json({
        user: 'Ramm H'
    });
})

app.listen(config.port, (err) => {
    console.log('Magic happens on port awesome ' + config.port);
});
