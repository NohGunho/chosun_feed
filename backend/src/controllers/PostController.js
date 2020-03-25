const Post = require('../models/Post')
    , sharp = require('sharp')
    , path = require('path')
    , fs = require('fs')
    , stream = require('getstream')
    , uuid = require('uuid')
    , config = require("../config/config");

module.exports = {

  // 게시물 가져오기
  async index(req, res) {

    // getStream.io Dashboard Connect
    //var streamClient = stream.connect('p5mv3rqjj4u6','qbanwcyuyvts8s48vtbhphc645zbv7fzudvdp6wvjxjbd77msunquxf2z7hzw2te','70719');

    var timelineFeed = config.GETSTREAM.feed("timeline", `${req.query.id}`);
    // getStream.io 에서 timeline feed 가져오기
    let feedList  = [];
    await timelineFeed
      .get({ limit: 10 })
      .then(activitiesSuccess)
      .catch(activitiesError);

      function activitiesSuccess(successData) {
        feedList = successData.results;
      }
  
      function activitiesError(errorData) {
        console.log(errorData);
      }

     // postId 배열 만들기
    let postId  = [];
    for(var i =0 ; i<feedList.length ; i++){
      postId[i] = (feedList[0].object);
    } 

    // axios 에서 파라미터 가져오는 방법 req.query.id
    //const posts = await Post.find({"name":`${req.query.id}`}).sort('-createdAt');

    const posts1 = await Post.find({"postId" : { $in : postId}}).sort('-createdAt');

    return res.json(posts1);
  },  

  // 게시물 업로드
  async store(req, res) {

    const { site, sectionId, name, title, contents, hashtags } = req.body;
    const { filename: image } = req.file;

    const [fname] = image.split('.');
    const fileName = `${ fname }.jpg`;

    // uuid 발급 ( postId )
    const postId = uuid.v1();

    // getStream.io Dashboard Connect
    //var streamClient = stream.connect('p5mv3rqjj4u6','qbanwcyuyvts8s48vtbhphc645zbv7fzudvdp6wvjxjbd77msunquxf2z7hzw2te','70719');
    
    // Activity setting (getStream.io 에 추가할 데이터 세팅)
    var activity = {
      actor: `${name}`,
      verb: 'insert',
      object: `${postId}`,
      title: `${title}`,
      contents: `${contents}`,
      imageUrl : `${fileName}`
    };
    
    // user feed get
    var userFeed = config.GETSTREAM.feed(
            'user',
						`${sectionId}`,
    );
    
    // timeline feed그룹에 세팅한 activity 추가.
    userFeed
					.addActivity(activity)
					.then(function(response) {
            console.log('success!!');
					})
					.catch(function(err) {
						console.log(err);
          });
          
    // 이미지 파일 재규격 및 업로드 경로에 파일 올리기. 추후 이미지 경로가 있을 시 이건 삭제 가능하지만 재규격 싸이즈는 확인해봐야함.
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', fileName)
      )

    // 파일 삭제
    fs.unlinkSync(req.file.path);

    // mongoDb에 데이터 insert
    const post = await Post.create({
      postId,
      site,
      sectionId,
      name,
      title,
      contents,
      hashtags,
      image: fileName
    });

    // websocket 에 데이터 세팅
    req.io.emit('post', post);

    return res.json(post);
  }
};