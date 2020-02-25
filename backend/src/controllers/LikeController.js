const stream =require("getstream");
const Post = require('../models/Post');

module.exports = {

  async store(req, res) {

    
    let client = stream.connect('b9ae2fjtacfz','cszna5ep76cdngz35fm6rvrkkxa82drwntkqhqc6bn4vcbkycb8e5hvs6serz6ra','70534');

    var test  = client.user("chosunBiz").create({
      name: "chosunBiz", 
      occupation: "chosunBiz",
      gender: 'male'
    });
    console.log("userToken = " + test);
    
    const post = await Post.findById(req.params.id);

    post.likes += 1;

    await post.save();

    req.io.emit('like', post);

    return res.json(post);
  }
};