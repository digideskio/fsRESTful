var FS = require('modesl');
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

freeswitch.prototype.getNode = function(node,cb) {
  var $self = this;
  if(typeof $self.conns[node.id] !== 'undefined'){ return $self.conns[node.id] }
  
  var $conn = new FS.Connection(node.address,parseInt(node.port),node.password, function(){ cb($conn); });
};

freeswitch.prototype.api = function(node,cmd,cb) {
  var $self = this;
  
  $self.getNode(node,function(conn){
    conn.api(cmd,function(res){
      // res contains the headers and body of FreeSwitch's response.
      if(cb) return cb(res.getBody());
    })
  });

};

//process.on('unhandledRejection', function(reason, p){
//    console.log("Possibly Unhandled Rejection at: Promise ", p, " reason: ", reason);
    // application specific logging here
//});

module.exports = freeswitch.getInstance();
