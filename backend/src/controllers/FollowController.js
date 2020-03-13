const Follow = require("../models/Follow"),
  stream = require("getstream");

module.exports = {
  async follow(req, res) {
    // getStream.io Dashboard Connect
    var streamClient = stream.connect(
      "p5mv3rqjj4u6",
      "qbanwcyuyvts8s48vtbhphc645zbv7fzudvdp6wvjxjbd77msunquxf2z7hzw2te",
      "70719"
    );

    console.log(req.params.follower);
    console.log(req.params.sectionId);

    // timeline feed setting
    var timelineFeed = streamClient.feed("timeline", `${req.params.follower}`);

    // 구독한 리스트가 있는지 db에서 데이터 확인.
    const followList = await Follow.find({ follower: req.params.follower });
    
    // 첫번째 구독이라면 follow model 을 생성하여 DB에 데이터 최초 저장.
    if (followList.length === 0) {
      let follow = new Follow({
        follower: req.params.follower,
        sectionList: [
          {
            sectionId: req.params.sectionId,
            imgUrl: "test.jpg"
          }
        ]
      });

      follow.save(function(err, list) {
        if (err) return console.error(err);
        console.log("subscribe add success!");
        //timelineFeed.follow("user", `${req.query.sectionId}`);  db insert success 시 getStream.io follow 추가
      });
    } else { // 두번째 이상 구독이라면 기존에 저장되었던 follow 테이블에 데이터를 가져와 신규로 구독한 데이터를 push.
      followList[0].sectionList.push({
        sectionId: req.params.sectionId,
        imgUrl: "test1.jpg"
      });

      console.log(followList[0].sectionList);
      followList[0].save(function(err, list) {
        if (err) return console.error(err);
        console.log("subscribe add success!");
         //timelineFeed.follow("user", `${req.query.sectionId}`);  db insert success 시 getStream.io follow 추가
      });
    }
  }
};
