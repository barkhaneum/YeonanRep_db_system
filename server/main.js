var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var api = require('./routes/index');


var cors = require('cors'); 
// If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
// 권한 관련해서 해결하기 위함
 
//conncet to mongodb server
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log('connected mongodb server!');
});
 
mongoose.connect('mongodb://localhost/test'); //MongoDB DB경로
 
const port = 3002;
 
//권한 사용하기
app.use(cors());

//bodyParser setting
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/api', api); // ~~~/api  로접속했을때 api ---> ./routes/index 를 사용한다.
 
app.listen(port, () => {
  console.log('Express is listening on port', port);
});