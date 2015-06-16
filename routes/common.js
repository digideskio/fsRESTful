var fs = require('fs');
var Handlebars = require('handlebars');
var deasync = require('deasync');

function Common(){
}

Common.prototype.notFound = function(data){
  var xmlResult;
  fs.readFile('./handlebars/notfound.handlebars', { encoding: 'utf-8'}, function(err, data){
  if (err) throw err;
  var template = Handlebars.compile(data);
  xmlResult = template({data:data});
  });
  while(xmlResult === undefined) {
    deasync.runLoopOnce();
  }
  return xmlResult;
};

module.exports = new Common();

