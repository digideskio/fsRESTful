var orm = require('orm');
var fs = require('./freeswitch');

var models = function (db, models, next){

  models.Nodes = db.define('nodes',{
    id: {type:'serial', key:true},
    descr: String,
    address: String,
    port: String,
    password: String
  });
  
  models.Gateways = db.define('gateways',{
    id: {type:'serial', key:true},
    descr: String,
    address: String,
    profile: String,
    login: String,
    password: String,
    node_id: {type:'integer'},
    enabled: Boolean,
    register: Boolean
  },{
    hooks: {
      afterSave: function(next){
        var $self = this;
        if(typeof $self.node === 'undefined') 
          models.Nodes.get($self.node_id,function(err,data){ 
            $self.node = data;
            fs.api($self.node,'sofia profile ' + $self.profile + ' killgw gw-'+$self.id,function(){
              fs.api($self.node,'sofia profile ' + $self.profile + ' rescan reloadxml');	
            });
          });
        else
          fs.api($self.node,'sofia profile ' + $self.profile + ' killgw gw-'+$self.id,function(){
            fs.api($self.node,'sofia profile ' + $self.profile + ' rescan reloadxml');	
          });

        return next;
      },
      afterRemove: function(next){
        var $self = this;
        fs.api($self.node,'sofia profile ' + $self.profile + ' killgw gw-'+$self.id);
        return next;
      }
    }
  });

  models.Gateways.hasOne('node',models.Nodes,{required: true, autoFetch:true});
  
  models.Headers = db.define('headers',{
    id: {type: 'serial', key: true},
    number_id: {type: 'integer'},
    name: String,
    value: String
  });

  models.Numbers = db.define('numbers',{
    id: {type:'serial', key:true},
    number: String,
    descr: String,
    gateway_id: {type:'integer'},
    destination: String,
  });

  models.Numbers.hasOne('gateway',models.Gateways,{required:true, autoFetch:true});
  models.Numbers.hasMany('headers',models.Headers,{},{key:true,autoFetch:true});

  db.sync(function(){});
  next();
}

module.exports = models;


