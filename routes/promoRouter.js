const express = require('express');
const bodyParser = require('body-parser');


const promoRouter =  express.Router();
const authenticate = require('../authenticate')
promoRouter.use(bodyParser.json());
const Promos = require('../models/promotions');
promoRouter.route('/')
.get((req,res,next)=>{
    Promos.find({})
      .then((promos)=>{
          res.statusCode =  200;
          res.setHeader('Content-Type','application/json');
          res.json(promos);
          console.log(promos)
      },(err)=>console.log(err))
      .catch((err)=>console.log(err))
})
.post(authenticate.verifyUser,(req,res,next)=>{
 Promos.create(req.body) 
    .then((promos)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promos);
        console.log('inserted succesfully')
        console(promos)
    },(err)=>next(err))
    .catch((err)=>console.log(err))
})
.put(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT is not supported in /promotions')
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    Promos.remove({})
    .then(()=>{
        res.statusCode = 200;
        console.log('deleted succesfully');
        res.end('all the promotions deleted succesfully')
    })
    .catch((err)=>console.log(err))
})



promoRouter.route('/:promoId')

.get((req,res,next)=>{
       Promos.findById(req.params.promoId)
       .then((promo)=>{
           res.statusCode = 200;
           res.setHeader('Content-Type','application/json');
           res.json(promo);
       })
       .catch((err)=>console.log(err))
})
.post(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('POST is not supported for /promotion/' + req.params.promoId);
})

.put(authenticate.verifyUser,(req,res,next)=>{
      Promos.findByIdAndUpdate(req.params.promoId,{$set :req.body },{new : true})
      .then((promo)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promo);
      },(err)=>next(err))
      .catch((err)=>console.log(err))
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    Promos.findByIdAndRemove(req.params.promoId)
    .then(()=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.end('deleted the promo with id : ', req.params.promoId )
    })
    .catch((err)=>console.log(err))
})

module.exports = promoRouter;
