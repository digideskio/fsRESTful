var FS = require('esl');
var deasync = require('deasync');

var freeswitch = function(){};

freeswitch.getInstance = function(){
  if(typeof this.instance==='undefined'){
    this.instance = new freeswitch();
    var $self = this.instance;
    $self.clients = {};
    $self.conns = {};
  }
  return this.instance;
};

freeswitch.prototype.getNode = function(node) {
  var $self = this;
  if(typeof $self.conns[node.id] !== 'undefined'){ return $self.conns[node.id] }
  
  var $conn;
  $self.clients[node.id] = FS.client({password:node.password}, function(){ $conn = this; });
  $self.clients[node.id].connect(parseInt(node.port)||8021,node.address);
  
  while($conn === undefined) {
    deasync.runLoopOnce();
  }
  $self.conns[node.id] = $conn;
  return $conn;
};

freeswitch.prototype.api = function(node,cmd,cb) {
  var $self = this;
  
  $self.getNode(node).api(cmd)
    .then(function(res){
      // res contains the headers and body of FreeSwitch's response.
      if(res.body.match(/\+OK/)) if(cb) cb('ok'); else if(cb) cb('failed');
    },function(){
      if(cb) cb('failed'); 
    });

};

//process.on('unhandledRejection', function(reason, p){
//    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
    // application specific logging here
//});

module.exports = freeswitch.getInstance();
