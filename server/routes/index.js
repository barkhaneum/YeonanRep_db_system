var express = require('express');
var board = require('./board');
var board_2 = require('./board_2');
 
const router = express.Router();
router.use('/board',board); // router에서는 /board를 사용한다.
router.use('/board_2',board_2); // router에서는 /board를 사용한다.


module.exports =  router;