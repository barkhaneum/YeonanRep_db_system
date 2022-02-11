//Server와 client에 통신할때 상태값 처리해주는부분
// localhost:3000/api/board_2 로 접속했을때 처리되는부분
// 여기서 MongoDB데이터 조회

var express = require('express');
var mongoose = require('mongoose');

var db = mongoose.connection;  
const router = express.Router();
const req_arr = [];

// *** MondoDB조회 테스트 ***
router.post('/', (req, res, next) => { 
   // req로 조회하고싶은 목록을 보내줌 ( 조회할데이터를 전체적으로 넣어줘야할듯함)
  // collection도 바꿀지 생각해봐야함
    console.log("boards2로 요청이들어옴");
    return db.collection('boards').find( 
      // { $or : [{"sheet_name" : req.body.mydata}, {"sheet_name" : "Manila_clam"}] }, // 체크박스가 여러개일때 사용하도록함
      // { $or : [{"sheet_name" : req.body.mydata}] }
      { $or : req.body.mydata } // req.body.mydata에서 [ {"sheet_name" : "mani"} , {"sheet_name" : "cockle"} ..  ] 이런식으로 데이터가들어옴
      ).toArray(function(err,docs) {
      if (err) throw err;
          console.log(err);

      res.json(docs)  // 여기서 그냥 docs전체를 반환해버린다면.?????
    });
    res.end();
  });

module.exports = router;
