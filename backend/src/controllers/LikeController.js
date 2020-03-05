const stream =require("getstream");
const Post = require('../models/Post');

const config = require('../config/config');

module.exports = {

  async store(req, res) {
    
    //var streamClient = stream.connect(config.APP_KEY,config.APP_SECRET,config.APP_ID);
    function activitiesSuccess(successData) {
      console.log(successData);
    }
    
    function activitiesError(errorData) {
      console.log(errorData);
    }
    // user feed get
    /*var timelineFeed = streamClient.feed(
            'user',
						'chosunBiz',
    );*/
    
  
    var client = stream.connect('p5mv3rqjj4u6','qbanwcyuyvts8s48vtbhphc645zbv7fzudvdp6wvjxjbd77msunquxf2z7hzw2te','70719');
  
  const notificationFeed = client.feed('notification', '1');
  
    console.log(notificationFeed);
    
    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    req.io.emit('like', post);

    return res.json(post);
  }
};