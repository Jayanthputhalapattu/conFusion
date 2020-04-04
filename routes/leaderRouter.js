const express = require('express');
const bodyParser = require('body-parser');


const leaderRouter =  express.Router();

leaderRouter.route('/')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
        res.end('Will send all the leaders details for you!')
})
.post((req,res,next)=>{
    res.end('We create the leader with name : ' + req.body.name + ' with description : '
    +req.body.description)
})

.put((req,res,next)=>{
    res.statusCode = 403;
   res.end('PUT is not allowed in /leaders')
})
.delete((req,res,next)=>{
    res.end('Will delete all the leader details for you')
})


leaderRouter.route('/:leaderId')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    next();
})
.get((req,res,next)=>{
        res.end('Will send the promotion : ' + req.params.leaderId + ' for you!')
})
.post((req,res,next)=>{
    res.statusCode = 403;
    res.end('POST is not supported for /leaders/' + req.params.leaderId);
})

.put((req,res,next)=>{
   res.write(' Updating the leader  : ' + req.params.leaderId + '\n')
   res.end('will update the leader :' + req.body.name + ' with details : ' +req.body.description)
})
.delete((req,res,next)=>{
    res.end('Will delete the leader : ' + req.params.leaderId)
})

module.exports = leaderRouter;
