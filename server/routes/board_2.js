//Server와 client에 통신할때 상태값 처리해주는부분
// localhost:3000/api/board_2 로 접속했을때 처리되는부분
// 여기서 MongoDB데이터 조회

var express = require('express');
var mongoose = require('mongoose');
const { NavbarText } = require('reactstrap');
const { startSession } = require('../models/board');

var db = mongoose.connection;  
// *** main.js 에서 이미 DB와 연동이 되어있으므로 아래는 선언할필요가 없음 ***
// db.on('error', console.error);
// db.once('open', function(){
//   console.log('connected mongodb server!');
// });


// const my_test_data = db.collection("boards").findOne({writer :"haneum"});
// db.collection("boards").find({writer :"haneum"}).toArray();

// const my_test_data = db.collection("boards")
// const test = my_test_data.find({contents :"hansome boy"});

// var my_test_data = "";
// var my_test_data_2 = "";
// my_test_data = db.collection("boards").find({}, function(err, docs){
//   console.log(docs);
// }).toArray();
// const test = my_test_data.count(); // collection에서 document들의 총개수
// async function startSession(){
//   await my_test_data.find({writer :"haneum"})
// }

const router = express.Router();


// *** MondoDB조회 테스트 ***
router.post('/', (req, res, next) => { 
  var lon_arr = [];
  var lat_arr = [];
  if (req.body.mydata === "test_mydata") {
    
    // 바로아래서 Return한다음 res가 처리되도록한다.
    return db.collection('boards').find({}).toArray(function(err,docs) {
      if (err) throw err;
          console.log(err);
      for (var i = 0; i < docs.length; i++) {
          // console.log(docs[i].lon);
          // console.log("비동기?");
          lon_arr.push(docs[i].lon);
          lat_arr.push(docs[i].lat);
      }
      console.log(lon_arr + " : 2번으로 실행") // .... 2번째로 실행 (post맨으로 전송받고나서 실행)
      res.json({"lon_arr":lon_arr, "lat_arr":lat_arr})
      // console.log(lon_arr);  // 여기값은 나오는데 왜아래값들은 왜 안나올까???
    });
    // console.log(lon_arr + " : 1번으로 실행");  //.... 1번째로 실행
    // return res.json({ "lon_arr": lon_arr}); // postman으로 전송받으면 이게 먼저실행
  } else {
    console.log("test_mydata가 아닙니다.");
  }
  // Post방식으로 MongoDB에 데이터를 전달하면 success : true메세지 아니면 에러전달
        res.end();
  });

module.exports = router;