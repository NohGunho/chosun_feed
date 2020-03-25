"use strict";
const stream = require('getstream');
require("dotenv").config();

/**
 * Config
 */
module.exports = {
  GETSTREAM : stream.connect(process.env.GETSTREAM_APP_KEY,process.env.GETSTREAM_APP_SECRET,process.env.GETSTREAM_APP_ID),
  DB_URL:'mongodb://localhost:27017/feed_test'
};