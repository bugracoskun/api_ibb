var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200).send("Hello");
});

router.get('/getstops', function(req, res, next) {
  console.log("getStops");
  var obj={};
  req.app.locals.BC.getStops(obj,function(result){
    if(result.status){
      res.status(200).send(result);
    }else{
      res.status(400).send(result)
    }
  })
});



module.exports = router;