var express = require('express');
var router = express.Router();
var Common = require('./common');

router.all('/', function(req, res, next) {
	
	var context = req.query['Caller-Context'];
	var number = req.query['Caller-Destination-Number'];
  var node_id = req.query.node;
  
  if(typeof node_id === 'undefined') return res.send({error:'data',detail:{msg:"No node id supplied"}});

	if(
      (typeof context !== 'undefined') 
      && (typeof number !=='undefined')
      && (node_id == parseInt(node_id))
      && (/_\d+_incoming/.test(context))
    ){
    var match = /_(\d+)_incoming/.exec(context);
		req.models.Numbers.find({ gateway_id:match[1], number:number },function(err, result){
			if(err) return res.json({err: err});
			if(!result || !result[0]) return res.send(Common.notFound());
      if(result[0].gateway.node_id!=node_id) return res.send(Common.notFound());
      res.set('Content-Type', 'text/xml');
			res.send(Common.sendXML('./handlebars/dialplan.handlebars', {context:context, number:result[0]}));
		});
	} else {
      res.set('Content-Type', 'text/xml');
      res.send(Common.notFound());
  }
});

module.exports = router;

