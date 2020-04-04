const express = require('express');
const bodyParser = require('body-parser');


const promoRouter =  express.Router();

promoRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
        res.end('Will send all the promotions for you!')
})
.post((req,res,next)=>{
    res.end('We create the promotion with name : ' + req.body.name + ' with description : '
    +req.body.description)
})

.put((req,res,next)=>{
    res.statusCode = 403;
   res.end('PUT is not allowed in /promotions')
})
.delete((req,res,next)=>{
    res.end('Will delete all the promotions for you')
})


promoRouter.route('/:promoId')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
        res.end('Will send the promotion : ' + req.params.promoId + ' for you!')
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST is not supported for /promotion/' + req.params.promoId);
})

.put((req,res,next)=>{
   res.write(' Updating the promotion : ' + req.params.promoId + '\n')
   res.end('will update the promotions :' + req.body.name + ' with details : ' +req.body.description)
})
.delete((req,res,next)=>{
    res.end('Will delete the promotion : ' + req.params.promoId)
})

module.exports = promoRouter;
