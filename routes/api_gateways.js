var express = require('express');
var router = express.Router();
var form = require('express-form'), 
    field = form.field;


router.route('/')
  .get(function(req, res){
    req.models.Gateways.find({},function(err, gateways){
      if(err) return res.json({ error:'db', detail: err });
      res.json(gateways);
    });
  })
  .post(
      form(
        field('descr')    
        ,field('address').trim().required().notEmpty()
        ,field('profile').trim().required().notEmpty()
        ,field('login')
        ,field('password')
        ,field('node_id').required().isInt()
        ,field('enabled').toBoolean()
        ,field('register').toBoolean()
      ),
      function(req, res){
        if(!req.form.isValid) return res.json({ error:'data', detail: req.form.errors });
        req.models.Gateways.create({
          descr:req.form.descr,
          address:req.form.address,
          profile:req.form.profile,
          login:req.form.login,
          password:req.form.password,
          node_id:req.form.node_id,
          enabled:req.form.enabled,
          register:req.form.register
        },function(err, data){
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
    req.models.Gateways.get(req.params.id,function(err, gw){
      if(err && err.literalCode!='NOT_FOUND') return res.json({ error:'db', detail: err });
      res.json(gw||{});
    });
  })
  .put(
    form(
      field('descr')    
      ,field('address').trim().notEmpty()
      ,field('profile').trim().notEmpty()
      ,field('login')
      ,field('password')
      ,field('enabled').toBoolean()
      ,field('register').toBoolean()
    ),
    function(req, res){
      if(!req.form.isValid) return res.json({ error:'data', detail: req.form.errors });
      req.models.Gateways.get(req.params.id,function(err, gw){
        if(err) return res.json({ error:'db', detail: err });
        if(req.form.address) gw.address = req.form.address;
        if(req.form.profile) gw.profile = req.form.profile;
        if(req.form.login) gw.login = req.form.login;
        if(req.form.password) gw.password = req.form.password;
        if(req.form.descr) gw.descr = req.form.descr;
        if(req.form.enabled) gw.enabled = req.form.enabled;
        if(req.form.register) gw.register = req.form.register;
        gw.save(function(err){
          if(err) return res.json({ error:'db', detail: err });
          res.json(gw);
        });
      });
    }
  )
  .delete(function(req, res){
    req.models.Gateways.get(req.params.id, function(err, gw){
      if(err) return res.json({ error:'db', detail: err });
      gw.remove();
      res.json({});
    });
  });
  

module.exports = router;

