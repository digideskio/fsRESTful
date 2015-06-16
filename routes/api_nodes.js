var express = require('express');
var router = express.Router();
var form = require('express-form'), 
    field = form.field;

router.route('/')
  .get(function(req, res){
    req.models.Nodes.find({},function(err, nodes){
      if(err) return res.json({ error:'db', detail: err });
      res.json(nodes);
    });
  })
  .post(
      form(
        field('address').trim().required().notEmpty()
        ,field('password').required().minLength(7)
        ,field('descr')
        ,field('port')
      ),
      function(req, res){
        if(!req.form.isValid) return res.json({ error:'data', detail: req.form.errors });
        req.models.Nodes.create({address:req.form.address,password:req.form.password,descr:req.form.descr,port:req.form.port||"8021"},function(err, data){
          res.json(data);
        });
      }
  );

router.route('/:id')
  .all(function(req, res, next) {
    if(!/^\d+$/.test(req.params.id)) return res.json({ error:'data', detail:{msg:"Wrong object id passed"}});
    next();
  })
  .get(function(req, res){
    req.models.Nodes.get(req.params.id,function(err, node){
      if(err && err.literalCode!='NOT_FOUND') return res.json({ error:'db', detail: err });
      res.json(node||{});
    });
  })
  .put(
    form(
      field('address').trim().notEmpty()
      ,field('password').minLength(7)
      ,field('descr')
      ,field('port')
    ),
    function(req, res){
      if(!req.form.isValid) return res.json({ error:'data', detail: req.form.errors });
      req.models.Nodes.get(req.params.id,function(err, node){
        if(err) return res.json({ error:'db', detail: err });
        if(req.form.address) node.address = req.form.address;
        if(req.form.password) node.password = req.form.password;
        if(req.form.descr) node.descr = req.form.descr;
        if(req.form.port) node.port = req.form.port;
        node.save(function(err){
          if(err) return res.json({ error:'db', detail: err });
          res.json(node);
        });
      });
    }
  )
  .delete(function(req, res){
    req.models.Nodes.find({id:req.params.id}).remove(function(err){
      if(err) return res.json({ error:'db', detail: err });
      res.json({});
    });
  });
  

module.exports = router;

