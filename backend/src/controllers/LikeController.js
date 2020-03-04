const stream =require("getstream");
const Post = require('../models/Post');

module.exports = {

  async store(req, res) {
    
    var streamClient = stream.connect('p5mv3rqjj4u6','qbanwcyuyvts8s48vtbhphc645zbv7fzudvdp6wvjxjbd77msunquxf2z7hzw2te','70719');
    function activitiesSuccess(successData) {
      console.log(successData);
    }
    
    function activitiesError(errorData) {
      console.log(errorData);
    }

    // Activity setting
   /* var activity = {
      actor: 'user:chosunBiz',
      verb: 'add',
      object: 'test3',
      foreign_id: `upload:${1}`,
    }; */
    
    // user feed get
    var timelineFeed = streamClient.feed(
            'user',
						'chosunBiz',
    );
    
  
    var client = stream.connect('p5mv3rqjj4u6','qbanwcyuyvts8s48vtbhphc645zbv7fzudvdp6wvjxjbd77msunquxf2z7hzw2te','70719');
//    let token = client.createUserToken("chosunBiz");
  const notificationFeed = client.feed('notification', '1');
  /*token = client.getReadOnlyToken(
  'timeline',
  'test'
  );*/
    console.log(notificationFeed);
    //timelineFeed.follow('user', 'chosunBiz');
    
    /*function callback(response) {
      console.log('gdgd');
      console.log(JSON.stringify(response));
     }

     timelineFeed.subscribe(callback);
     */

    // timeline feed그룹에 세팅한 activity 추가.
    /*timelineFeed
					.addActivity(activity)
					.then(function(response) {
            //cb(null, result);
            console.log('success!!');
					})
					.catch(function(err) {
						console.log(err);
          });
          */
    
    //console.log("timelineFeed = " +timelineFeed);
    
    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    req.io.emit('like', post);

    return res.json(post);
  }
};