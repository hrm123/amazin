const express = require('express'); // to create http routes
const morgan = require('morgan'); // http request logger for nodejs
const bodyParser = require('body-parser'); // data reader
const mongoose  = require('mongoose'); // mongo db agent
const cors = require('cors');
const router = require('express').Router();

const config = require('./config');
const app = express();
let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('new-message', (message) => {
      io.emit('new-message', message);
      });
    
});

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
app.use(cors()); // any API call from UI will not have domain issues


const userRoutes = require('./routes/account');
app.use('/api/accounts', userRoutes);

const sellerRoutes = require('./routes/seller');
app.use('/api/seller', sellerRoutes);

const productSearchRoutes = require('./routes/product-search');
app.use('/api/search', productSearchRoutes);


const mainRoutes = require('./routes/main');
app.use('/api', mainRoutes);

app.post('/signup1', (req, res) => {
    console.log('signup1');
    // console.log(req.body);
    res.send('POST request to the homepage')
});

server.listen(3031, () => {
  console.log(`socket started on port: 3031`);
});

app.get('/', (req,res,next) => {
    console.log(req.route);
    
});

app.listen(config.port, (err) => {
    console.log('Magic happens on port awesome ' + config.port);
    app._router.stack.forEach(print.bind(null, []));
});


function print (path, layer) {
    if (layer.route) {
      layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
    } else if (layer.name === 'router' && layer.handle.stack) {
      layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
    } else if (layer.method) {
      console.log('%s /%s',
        layer.method.toUpperCase(),
        path.concat(split(layer.regexp)).filter(Boolean).join('/'))
    }
  }
  
  function split (thing) {
    if (typeof thing === 'string') {
      return thing.split('/')
    } else if (thing.fast_slash) {
      return ''
    } else {
      var match = thing.toString()
        .replace('\\/?', '')
        .replace('(?=\\/|$)', '$')
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
      return match
        ? match[1].replace(/\\(.)/g, '$1').split('/')
        : '<complex:' + thing.toString() + '>'
    }
  }
  
  