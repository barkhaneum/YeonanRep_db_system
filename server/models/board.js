// 여기서 MongoDB에 넣을 Model을 설계한다.
var mongoose = require('mongoose');
 
const Schema = mongoose.Schema;
 
const Board = new Schema({
  writer : String,
  contents : String,
  date: {
    created : {type:Date, default:Date.now},
    edited : {type:Date, default:Date.now}
  },
  is_edited : {type:Boolean, default:false}
})
 
module.exports = mongoose.model('board',Board);