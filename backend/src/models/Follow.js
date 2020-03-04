/**
 * Representação da tabela do BD em formato de um objeto JavaScript (abstração).
 */

const mongoose = require('mongoose');

// followGroup = {뉴스:a , 기자:b , 이슈키워드:c }
// followCode = {정치 : a1 , 경제 :a2 , 기자명 : b1} 이런식으로 등록하여 관리.
// followId = {섹션명 , 기자id , 이슈키워드} - 각각이 전부 unique 해야함.
// follower = follower 자신의 id 나 unique 한 값
// followDate = follow 한 시간
const FollowSchema = new mongoose.Schema({
  followId: String,
  followGroup : String,
  followCode : String,
  follower: String,
  followDate:{
    type:Date,
    default:Date.now,
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Follow', FollowSchema);