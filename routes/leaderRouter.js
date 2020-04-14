const express = require('express');
const bodyParser = require('body-parser');


const leaderRouter =  express.Router();
const authenticate = require('../authenticate')
const Leaders = require('../models/leaders')
leaderRouter.route('/')
.get((req,res,next)=>{
    Leaders.find({})
      .then((leaders)=>{
          res.statusCode =  200;
          res.setHeader('Content-Type','application/json');
          res.json(leaders);
          console.log(leaders)
      },(err)=>console.log(err))
      .catch((err)=>console.log(err))
})
.post(authenticate.verifyUser,(req,res,next)=>{
 Leaders.create(req.body) 
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
        console.log('inserted succesfully')
        console(leader)
    },(err)=>next(err))
    .catch((err)=>console.log(err))
})
.put(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('PUT is not supported in /leaders')
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    Leaders.remove({})
    .then(()=>{
        res.statusCode = 200;
        console.log('deleted succesfully');
        res.end('all the leaders deleted succesfully')
    })
    .catch((err)=>console.log(err))
})



leaderRouter.route('/:LeaderId')

.get((req,res,next)=>{
       Leaders.findById(req.params.LeaderId)
       .then((leader)=>{
           res.statusCode = 200;
           res.setHeader('Content-Type','application/json');
           res.json(leader);
       })
       .catch((err)=>console.log(err))
})
.post(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode = 403;
    res.end('POST is not supported for /leaders/' + req.params.LeaderId);
})

.put(authenticate.verifyUser,(req,res,next)=>{
      Leaders.findByIdAndUpdate(req.params.LeaderId,{$set :req.body },{new : true})
      .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(leader);
      },(err)=>next(err))
      .catch((err)=>console.log(err))
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    Leaders.findByIdAndRemove(req.params.LeaderId)
    .then((leader)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.end('deleted the leader with id : ' + req.params.LeaderId )
    })
    .catch((err)=>console.log(err))
})

module.exports = leaderRouter;
