/**
 * Representação da tabela do BD em formato de um objeto JavaScript (abstração).
 */

const mongoose = require('mongoose');

// sectionList = section 별 follow 
// authorList = 기자 별 follow 
// keywordList = 이슈키워드 별 follow 
// follower = follower 자신의 id 나 unique 한 값
// followDate = follow 한 시간
// imgUrl = 화면에 보여질 이미지 경로나 이름 
const FollowSchema = new mongoose.Schema({
  follower: String,
  sectionList : [new mongoose.Schema({
    sectionId : String ,
    imgUrl : String ,
    followDate: {
      type:Date,
      default:Date.now,
    }
  })],
  authorList : [new mongoose.Schema({
    authorId : String ,
    imgUrl : String ,
    followDate: {
      type:Date,
      default:Date.now,
    }
  })],
  keywordList : [new mongoose.Schema({
    keyword : String ,
    imgUrl : String ,
    followDate: {
      type:Date,
      default:Date.now,
    }
  })],
}, {
  timestamps: true
});

module.exports = mongoose.model('Follow', FollowSchema);