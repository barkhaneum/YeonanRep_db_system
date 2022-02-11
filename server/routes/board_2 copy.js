//Server와 client에 통신할때 상태값 처리해주는부분
// localhost:3000/api/board_2 로 접속했을때 처리되는부분
// 여기서 MongoDB데이터 조회

var express = require('express');
var mongoose = require('mongoose');
const { NavbarText } = require('reactstrap');
const { startSession } = require('../models/board');

//csv 테스트중..
const Json2csvParser = require("json2csv").Parser;
const fs = require("fs");

var db = mongoose.connection;  
mongoose.connect("mongodb://192.168.0.8:17017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false");
// *** main.js 에서 이미 DB와 연동이 되어있으므로 아래는 선언할필요가 없음 ***


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
    console.log("boards2로 요청이들어옴");
    // 바로아래서 Return한다음 res가 처리되도록한다.
    console.log(req);

     db.collection('boards').find({"sheet_name" : req.body.mydata}).toArray(function(err,docs) {
      if (err) throw err;
          console.log(err);
      for (var i = 0; i < docs.length; i++) {
          lon_arr.push((docs[i].lon)); // 괄호를 두번묶어줘야한다.
          lat_arr.push((docs[i].lat));
      }
      console.log("여기서 전달을못함?");
      console.log(lon_arr);

      // res.json({"lon_arr":lon_arr, "lat_arr":lat_arr})  // 여기서 그냥 docs전체를 반환해버린다면.?????
    })

    
    res.end();

    return
  });

  
module.exports = router;


//*** 백업용 소스  ***/
// if (req.body.mydata === "clam") {
//   console.log("boards2로 요청이들어옴");
//   // 바로아래서 Return한다음 res가 처리되도록한다.
//   return db.collection('boards').find({"sheet_name" : "clam"}).toArray(function(err,docs) {
//     if (err) throw err;
//         console.log(err);
//     for (var i = 0; i < docs.length; i++) {
//         // console.log(docs[i].lon);
//         // console.log("비동기?");
//         lon_arr.push(docs[i].lon);
//         lat_arr.push(docs[i].lat);
//         // console.log("여기서 찍나...?");
//     }
//     // console.log(lon_arr + " : 2번으로 실행") // .... 2번째로 실행 (post맨으로 전송받고나서 실행)
//     res.json({"lon_arr":lon_arr, "lat_arr":lat_arr})
//     // console.log(lon_arr);  // 여기값은 나오는데 왜아래값들은 왜 안나올까???
//   });
//   // console.log(lon_arr + " : 1번으로 실행");  //.... 1번째로 실행
//   // return res.json({ "lon_arr": lon_arr}); // postman으로 전송받으면 이게 먼저실행
// }else if(req.body.mydata === "surf_clam"){
//   return db.collection('boards').find({"sheet_name" : "surf_clam"}).toArray(function(err,docs) {
//     if (err) throw err;
//         console.log(err);
//     for (var i = 0; i < docs.length; i++) {
//         // console.log(docs[i].lon);
//         // console.log("비동기?");
//         lon_arr.push(docs[i].lon);
//         lat_arr.push(docs[i].lat);
//         // console.log("여기서 찍나...?");
//     }
//     // console.log(lon_arr + " : 2번으로 실행") // .... 2번째로 실행 (post맨으로 전송받고나서 실행)
//     res.json({"lon_arr":lon_arr, "lat_arr":lat_arr})
//     // console.log(lon_arr);  // 여기값은 나오는데 왜아래값들은 왜 안나올까???
//   });
// } else {
//   console.log("test_mydata가 아닙니다.");
// }