const express = require('express');

const dishRouter = express.Router();
const bodyParser = require('body-parser')
dishRouter.use(bodyParser.json());
dishRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
    res.end('Will send the all the dishes available')
})
.post((req,res,next)=>{
    res.end('Will create the dish with name : ' + req.body.name + ' with description : ' + req.body.description);
    
})
.put((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST is not available on /dishes')
})
.delete((req,res,next)=>{
    res.end('Will send the all the dishes available')
});

dishRouter.route('/:dishID')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
    res.end('will send the item/dish : ' + req.params.dishID);
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST is not supported');
    
})
.put((req,res,next)=>{
    res.write('Updating the dish...'+ '\n');
    res.end('Therefore the dish : ' + req.params.dishID + ' is being updated')
})
.delete((req,res,next)=>{
    res.end('Will delete the dish : ' + req.params.dishID + ' soon')
});

module.exports = dishRouter;