var express = require('express');
var router = express.Router();
var Common = require('./common');

router.all('/', function(req, res, next) {
	
	var purpose = req.query.purpose || 'users';
	var profile = req.query.profile;
  var node_id = req.query.node;

	if(purpose == 'gateways'){
    if(typeof node_id === 'undefined') return res.send({error:'data',detail:{msg:"No node id supplied"}});
		req.models.Gateways.find({node_id:node_id,profile:profile},function(err, result){
			if(err) return res.json({err: err});
			if(!result || !result[0]) return res.json({error:'data',detail:{msg:"Wrong node id"}});
      res.set('Content-Type', 'text/xml');
      res.send(Common.sendXML('./handlebars/gateways.handlebars',{gateways:result}));
		});
	} else {
      res.set('Content-Type', 'text/xml');
      res.send(Common.notFound());
  }
});

module.exports = router;

