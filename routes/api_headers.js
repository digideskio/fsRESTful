var express = require('express');
var router = express.Router();
var form = require('express-form'), 
    field = form.field;

router.route('/')
  .get(function(req, res){
    req.models.Headers.find({},function(err, headers){
      if(err) return res.json({ error:'db', detail: err });
      res.json(headers);
    });
  })
  .post(
      form(
        field('name').trim().required().notEmpty()
        ,field('value').trim().required().notEmpty()
        ,field('number_id').required().isInt()
      ),
      function(req, res){
        if(!req.form.isValid) return res.json({ error:'data', detail: req.form.errors });
        req.models.Numbers.get(req.form.number_id,function(err, number){
          if(err) return res.json({ error:'data', detail:{msg:"Wrong number id passed"}});
          req.models.Headers.create({name:req.form.name,value:req.form.value,number_id:req.form.number_id},function(err, data){
            number.addHeaders([data],function(err){
              if(err) return res.json({ error:'data', detail:{msg:"Error adding header", data:err}});
              res.json(data);
            });
          });
        })
      }
  );

router.route('/:id')
  .all(function(req, res, next) {
    if(!/^\d+$/.test(req.params.id)) return res.json({ error:'data', detail:{msg:"Wrong object id passed"}});
    next();
  })
  .get(function(req, res){
    req.models.Headers.get(req.params.id,function(err, header){
      if(err && err.literalCode!='NOT_FOUND') return res.json({ error:'db', detail: err });
      res.json(header||{});
    });
  })
  .put(
    form(
      field('name').trim().notEmpty()
      ,field('value').trim().notEmpty()
    ),
    function(req, res){
      if(!req.form.isValid) return res.json({ error:'data', detail: req.form.errors });
      req.models.Headers.get(req.params.id,function(err, header){
        if(err) return res.json({ error:'db', detail: err });
        if(req.form.name) header.name = req.form.name;
        if(req.form.value) header.value = req.form.value;
        header.save(function(err){
          if(err) return res.json({ error:'db', detail: err });
          res.json(header);
        });
      });
    }
  )
  .delete(function(req, res){
    req.models.Headers.find({id:req.params.id}).remove(function(err){
      if(err) return res.json({ error:'db', detail: err });
      res.json({});
    });
  });
  

module.exports = router;

