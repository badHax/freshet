var config = require("./config/default.js").values;
var db = require('./db/db.js');
var job = require("./jobs/job").job;
var path = require('path');
var express = require("express");
var app = express();

var last_id = 0;

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.static('ui'))
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

 /* serves main page */
 app.get("/", function(req, res) {
    res.sendfile('index.html')
 });

app.get("/jobs", function(req, res){
   var out={};
    db.get_jobs().then(function(resp){
        for(var i=0 ; i<resp.length; i++){
            var name = resp[i]["dataValues"]["name"];
            var end = resp[i]["dataValues"]["stop"];
            var start = resp[i]["dataValues"]["start"];
            var frequency = resp[i]["dataValues"]["frequency"];
            var id =  resp[i]["dataValues"]["id"];
            console.log(last_id+" Last seen")
            if(last_id < id){
                out[i.toString()] =  
                    '<div class="col-lg-3 col-md-6 col-sm-6"><div class="single_pricelist wow fadeInUp"><div class="single_pricelist_box">'+
                   '<p>'+name+'</p></div><div class="single_pricelist_content"><h1>'+frequency+'</h1>'+
                   '<p><i class="fa fa-trophy"></i>'+start+'</p>'+
                  '<p><i class="fa fa-trophy"></i>'+end+'</p></div></div></div>';
                last_id += 1;
            }
            
        }
    console.log(out);
    res.send(out);
});
    
});
 /* serves add */
 app.post('/add', function(req, res) {
    console.log(req.body.date);
    res.sendfile('ui/index.html')
 });

 var port = process.env.PORT || 3000;
 app.listen(port, function() {
   console.log("Listening on " + port);
 });
 