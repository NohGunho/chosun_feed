const Follow = require("../models/Follow"),
  stream = require("getstream");

module.exports = {
  // 내 구독 리스트
  async index(req, res) {
    const followList = await Follow.find(
      { follower: `${req.params.follower}` },
      { "sectionList.sectionId": 1 }
    );
    // 구독한 섹션리스트 json 데이터에서 배열로 만들기.
    const sectionArray = [];
    if (followList.length !== 0) {
      for (var i = 0; i < followList[0].sectionList.length; i++) {
        sectionArray[i] = followList[0].sectionList[i].sectionId;
      }
    }

    return res.json(sectionArray);
  },

  //follow 기능
  async follow(req, res) {
    // getStream.io Dashboard Connect
    var streamClient = stream.connect(
      "p5mv3rqjj4u6",
      "qbanwcyuyvts8s48vtbhphc645zbv7fzudvdp6wvjxjbd77msunquxf2z7hzw2te",
      "70719"
    );

    // id , section , imgUrl 값 세팅
    const follower = req.params.follower;
    const sectionId = req.params.sectionId;
    const imgUrl = "test.jpg";

    // timeline feed setting
    var timelineFeed = streamClient.feed("timeline", `${follower}`);

    // 구독리스트가 있는지 db에서 데이터 확인.
    const followList = await Follow.find({ follower: follower });
    // 이미 구독리스트에 데이터는 있지만 구독버튼을 누른 섹션이 있는지 확인.
    const sectionList = await Follow.find({ follower: follower })
      .where("sectionList.sectionId")
      .equals(sectionId);

    let result = "";

    // 첫번째 구독이라면 follow model 을 생성하여 DB에 데이터 최초 저장.
    if (followList.length === 0 && sectionList.length === 0) {
      let follow = new Follow({
        follower: follower,
        sectionList: [
          {
            sectionId: sectionId,
            imgUrl: "test.jpg"
          }
        ]
      });

      follow.save(function(err, list) {
        if (err) return console.error(err);
        console.log("subscribe add success!");
        result = "success";
        //timelineFeed.follow("user", `${req.query.sectionId}`);  db insert success 시 getStream.io follow 추가
      });
    } else if (sectionList.length !== 1) {
      // 두번째 이상 구독이라면 기존에 저장되었던 follow 테이블에 데이터를 가져와 신규로 구독한 데이터를 push.
      followList[0].sectionList.push({
        sectionId: sectionId,
        imgUrl: "test1.jpg"
      });

      console.log(followList[0].sectionList);
      followList[0].save(function(err, list) {
        if (err) return console.error(err);
        console.log("subscribe add success!");
        result = "success";
        //timelineFeed.follow("user", `${req.query.sectionId}`);  db insert success 시 getStream.io follow 추가
      });
    }

    return res.json(result);
  },

  //unfollow기능
  async unfollow(req, res) {
    var follower = req.params.follower;
    const sectionId = req.params.sectionId;

    const followList = await Follow.find({ follower: follower });
    const sectionList = await Follow.find({ follower: follower },{"sectionList._id":1,"sectionList.sectionId":1})
      .where("sectionList.sectionId")
      .equals(sectionId);
    
    console.log(followList);
    console.log(sectionList[0].sectionList[0]);

    if (followList.lenth !== 0) {
      followList[0].sectionList.remove({sectionId : sectionId }); 

      followList[0].save(function(err, list) {
        if (err) return console.error(err);
        console.log("subscribe remove success!");
      });
    }
  }
};
