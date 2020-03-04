const Post = require("../models/Follow"),
  stream = require("getstream");

module.exports = {

  async store(req, res) {
    const { follower, followId, followGroup, followCode } = req.body;

    // getStream.io Dashboard Connect
    var streamClient = stream.connect(
      "p5mv3rqjj4u6",
      "qbanwcyuyvts8s48vtbhphc645zbv7fzudvdp6wvjxjbd77msunquxf2z7hzw2te",
      "70719"
    );

    // timeline feed setting
    var timelineFeed = streamClient.feed("timeline", `${follower}`);

    // follow add
    timelineFeed.follow("user", `${followId}`);

    // Follow Collection add
    const follow = await Follow.create({
      followId,
      followGroup,
      followCode,
      follower
    });
    req.io.emit("follow", follow);

    return res.json(follow);
  }
};
