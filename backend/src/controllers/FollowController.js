const Follow = require("../models/Follow"),
  stream = require("getstream")
  , config = require("../config/config");

// follow 와 unfollow , 자기 자신의 구독리스트를 가져오는 controller

module.exports = {
  // 내 구독 리스트
  async index(req, res) {

    let feedList = [];
    
    var timelineFeed = config.GETSTREAM.feed("timeline", "test");

    function activitiesSuccess(successData) {
      feedList = successData.results;
    }

    function activitiesError(errorData) {
      console.log(errorData);
    }
    // getStream.io에서 follow 리스트 가져오기
    await timelineFeed.following({limit: '10'}).then(activitiesSuccess).catch(activitiesError);

    // 구독한 섹션리스트 json 데이터에서 배열로 만들기.
    const sectionArray = [];
    if (feedList.length !== 0) {
      for (var i = 0; i < feedList.length; i++) {
        sectionArray[i] = (feedList[i].target_id).split(":")[1];
      }
    }

    console.log(sectionArray);

    return res.json(sectionArray);
  },

  //follow 기능
  async follow(req, res) {

    // id , section , imgUrl 값 세팅
    const follower = req.params.follower;
    const sectionId = req.params.sectionId;
    const imgUrl = "test.jpg";

    // timeline feed setting
    var timelineFeed = config.GETSTREAM.feed("timeline", `${follower}`);

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
        //db insert success 시 getStream.io follow 추가
        timelineFeed.follow("user", sectionId).then(
          result = "sucess"
        ).catch(
          result = "error"
        );  
      });
    } else if (sectionList.length !== 1) {
      // 두번째 이상 구독이라면 기존에 저장되었던 follow 테이블에 데이터를 가져와 신규로 구독한 데이터를 push.
      followList[0].sectionList.push({
        sectionId: sectionId,
        imgUrl: "test1.jpg"
      });

      // DB save가 성공하면 getStream.io 에도 데이터 저장
      followList[0].save(function(err, list) {
        if (err) return console.error(err);
        console.log("subscribe add success!");
        result = "success";
        //db insert success 시 getStream.io follow 추가
        timelineFeed.follow("user", sectionId).then(
          result = "sucess"
        ).catch(
          result = "error"
        );
      });
    }

    return res.json(result);
  },

  //unfollow기능
  async unfollow(req, res) {

    //response 값
    let result = "";

    // 고객id , unfollow할 sectionId 가져오기
    var follower = req.params.follower;
    const sectionId = req.params.sectionId;

    // DB에서 삭제할 데이터 찾기.
    const followList = await Follow.find({ follower: follower });
    const sectionList = await Follow.find({ follower: follower },{_id:0,follower:0, sectionList:{$elemMatch:{sectionId:sectionId}}});
    
    // 삭제할 배열의 _id 값 가져오기
    const sectionIdx = sectionList[0].sectionList[0]._id;

    //타임 라인 세팅
    var timelineFeed = config.GETSTREAM.feed("timeline", `${follower}`);

    if (followList.lenth !== 0 && sectionList[0].sectionList.length !==0 ) {
      // DB에서 데이터 삭제
      followList[0].sectionList.remove({_id : sectionIdx });
      
      // DB save가 성공하면 getStream.io 에도 데이터 삭제
      followList[0].save(function(err, list) {
        if (err) return console.error(err);
        console.log("subscribe remove success!");
        // getStream.io 데이터 삭제
        timelineFeed.unfollow("user", sectionId).then(
          result = "sucess"
        ).catch(
          result = "error"
        );
      });
    }else{
      result = "error";
    }

    return res.json(result);
  }
};
