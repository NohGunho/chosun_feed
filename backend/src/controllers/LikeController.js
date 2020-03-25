const stream = require("getstream");
const Post = require("../models/Post");
const config = require("../config/config");
require("dotenv").config();

module.exports = {
  async store(req, res) {
    // 기사 등록 테스트 용
    var streamClient = stream.connect(
      "p5mv3rqjj4u6",
      "qbanwcyuyvts8s48vtbhphc645zbv7fzudvdp6wvjxjbd77msunquxf2z7hzw2te",
      "70719"
    );
    var timelineFeed = streamClient.feed("timeline", "test");
    var userFeed = streamClient.feed("user", "international");

    //follow 리스트 가져오기
    /*
    const response = await userFeed.followers({limit: '10'});
    const response1 = await timelineFeed.following({limit: '10'});
    console.log(response);
    console.log(response1);
    */

    //unfollow
    /*
    timelineFeed.unfollow("user", 'culture-life').then(function(response){
      console.log("success!");
    })
    .catch(function(err){
      console.log(err);
    });
    */

    //follow
    /*
    timelineFeed.follow("user", 'culture-life').then(function(response){
      console.log("success!");
    })
    .catch(function(err){
      console.log(err);
    });
    */

    //getData
    /*
    let feedList  = [];
    let postId = [];
    await timelineFeed
      .get({ limit: 10 })
      .then(activitiesSuccess)
      .catch(activitiesError);

    await timelineFeed
      .get({ limit: 5, id_lt: "2b14fd59-68b9-11ea-8e9a-0ad70a8cb32c" })
      .then(activitiesSuccess)
      .catch(activitiesError);

    function activitiesSuccess(successData) {
      feedList = successData.results;
    }

    function activitiesError(errorData) {
      console.log(errorData);
    }
*/
    //activity add
    /*
    var userFeed = streamClient.feed("user", 'economy');

    var activity = {
      actor: '노건호',
      verb: 'insert',
      object: '2020031800008',
      title: 'test8',
      contents: 'test8입니다.',
      imageUrl : 'test8.jpg'
    };

    userFeed
					.addActivity(activity)
					.then(function(response) {
            console.log('success!!');
					})
					.catch(function(err) {
						console.log(err);
					});
    */
/*
   const post1 = await Post.find({postId : { $regex : "20200226" + ".*"}});
   console.log(post1);
*/

    console.log(process.env.DB_NAME);

    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    req.io.emit("like", post);

    return res.json(post);
  }
};
