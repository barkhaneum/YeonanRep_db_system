//Server와 클라이언트간에 통신할때 상태값 처리해주는부분
// localhost:3000/api/board 로 접속했을때 처리되는부분

var express = require('express');
var Board = require('../models/board'); //board에서는 MongoDB모델을 불러온다.
var mongoose = require('mongoose');
 
const router = express.Router();
 
router.post('/', (req, res) => { 
  if (req.body.username === "") {
    return res.status(400).json({ // return을 해서 밑에 저장함수가 작동안되도록한다.
      error: "EMPTY USERNAME", //이름부분이 비어있으면 에러를 출력
      code: 2
    });
  }
 
  if (req.body.contents === "") { //post가 보낸값을 req가 받는다.
    return res.status(400).json({
      error: "EMPTY CONTENTS",
      code: 2
    });
  }
 
  let board = new Board({ //에러를 출력안하면 보드를 만들고 아래에서 저장
    writer: req.body.username,
    contents: req.body.contents
  });
 
  // Post방식으로 MongoDB에 데이터를 전달하면 success : true메세지 아니면 에러전달
  board.save(err => { // json형식으로 저장
    if (err) throw err;
    return res.json({ success: true });
  });
});
 
module.exports = router;