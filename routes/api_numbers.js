var express = require('express');
var router = express.Router();
var form = require('express-form'), 
    field = form.field;

router.route('/')
  .get(function(req, res){
    req.models.Numbers.find({},function(err, numbers){
      if(err) return res.json({ error:'db', detail: err });
      res.json(numbers);
    });
  })
  .post(
      form(
        field('number').trim().required().notEmpty()
        ,field('destination').trim().required().notEmpty()
        ,field('gateway_id').required().isInt()
        ,field('descr')
      ),
      function(req, res){
        if(!req.form.isValid) return res.json({ error:'data', detail: req.form.errors });
        req.models.Numbers.create({number:req.form.number,destination:req.form.destination,gateway_id:req.form.gateway_id,descr:req.form.descr},function(err, data){
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
    req.models.Numbers.get(req.params.id,function(err, number){
      if(err && err.literalCode!='NOT_FOUND') return res.json({ error:'db', detail: err });
      res.json(number||{});
    });
  })
  .put(
    form(
      field('number').trim().notEmpty()
      ,field('destination').trim().notEmpty()
      ,field('gateway_id').isInt()
      ,field('descr')
    ),
    function(req, res){
      if(!req.form.isValid) return res.json({ error:'data', detail: req.form.errors });
      req.models.Numbers.get(req.params.id,function(err, number){
        if(err) return res.json({ error:'db', detail: err });
        if(req.form.number) number.number = req.form.number;
        if(req.form.destination) number.destination = req.form.destination;
        if(req.form.descr) number.descr = req.form.descr;
        if(req.form.gateway_id) number.gateway_id = req.form.gateway_id;
        number.save(function(err){
          if(err) return res.json({ error:'db', detail: err });
          res.json(number);
        });
      });
    }
  )
  .delete(function(req, res){
    req.models.Numbers.find({id:req.params.id}).remove(function(err){
      if(err) return res.json({ error:'db', detail: err });
      res.json({});
    });
  });
  

module.exports = router;

