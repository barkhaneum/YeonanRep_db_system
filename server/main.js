var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var api = require('./routes/index');

// 이쪽파일에서 메인 API를 만들어서 API뒤에 조회할데이터를 붙여서 사용하도록한다.


var cors = require('cors'); 
// If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
// 권한 관련해서 해결하기 위함
 
//conncet to mongodb server
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log('connected mongodb server!');
});
 
mongoose.connect('mongodb://192.168.0.8/test'); //MongoDB DB경로
// let url = "mongodb://username:password@localhost:27017/";
 
// 여기서 포트 번호를 변경함
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