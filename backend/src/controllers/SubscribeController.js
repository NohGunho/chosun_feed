const Subscribe = require("../models/Subscribe"),
Post = require('../models/Post');

module.exports = {

  async index(req, res) {

    const sectionInfos = await Subscribe.find({"second_depth_name" : ""});
    
    return res.json(sectionInfos);
  }
};
