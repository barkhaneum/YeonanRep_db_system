var express = require('express');
var board = require('./board');
var board_2 = require('./board_2');
var board_3 = require('./board_3');
var data_lookup = require('./data_lookup'); // 여기서 만든 js선언
// var db_to_csv = require('./db_to_csv');
 
const router = express.Router();
router.use('/board',board); // router에서는 /board를 사용한다.
router.use('/board_2',board_2); // router에서는 /board를 사용한다.
router.use('/board_3',board_3); // router에서는 /board를 사용한다.
router.use('/data_lookup',data_lookup); // 여기서 router에서 배포한다고 선언


module.exports =  router;