//Server와 client에 통신할때 상태값 처리해주는부분
// 192.168.0.8:3000/api/board_2 로 접속했을때 처리되는부분
// 여기서 MongoDB데이터 조회

var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connection;  

const router = express.Router();

// *** MondoDB조회 테스트 ***
router.post('/', (req, res, next) => { 

  var doc_data = null;
  // if (req.body.mydata === "test_mydata") { // 클라이언트로부터 test_mydata를받으면..
  var get_lat = req.body.lat;
  var get_lon = req.body.lon;
  // console.log(get_lat + "ddddddddddd");
  // req.
    // console.log("boards3로 요청이 들어옴");
    // 바로아래서 Return한다음 res가 처리되도록한다.
    return db.collection('boards').find({"lat" : get_lat, "lon" : get_lon}).toArray(function(err,docs) { //boardDB를 조회
      if (err) throw err;
          console.log(err);
      // console.log("에러가났어요");
      console.log("클릭한 마커데이터를 받았습니다." + "위도 : " + get_lat + "경도 : " + get_lon); // 클라이언트에서는 볼수없음
      // t_clay = docs[0].clay; // docs에서 데이터 가져올때 배열로 가져온다는것에 대해 주의
      // t_msl = docs[0].msl;
      doc_data = docs[0];  // Client로부터 요청받을때 1대신에 마커 속성을 넣는다.
      // console.log(lon_arr + " : 2번으로 실행") // .... 2번째로 실행 (post맨으로 전송받고나서 실행)
      res.json({
        // "clay" : t_clay,
        // "MSL": t_msl,
        "doc_data" : doc_data,
    }) 
    });
  // } else {
  //   console.log("test_mydata가 아닙니다.");
  // }


  // Post방식으로 MongoDB에 데이터를 전달하면 success : true메세지 아니면 에러전달
        res.end();
  });
  // 마커 뿌리는 위치가 어디야???

module.exports = router;