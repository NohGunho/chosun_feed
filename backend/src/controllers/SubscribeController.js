const Subscribe = require("../models/Subscribe"),
Post = require('../models/Post');

// 구독 추천 페이지를 위한 섹션별 , 기자별 구독할 수 있는 전체 리스트를 가져오기 위한 controller

module.exports = {

  async index(req, res) {

    const sectionInfos = await Subscribe.find({"second_depth_name" : ""});
    
    return res.json(sectionInfos);
  }
};
