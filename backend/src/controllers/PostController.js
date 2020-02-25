const Post = require('../models/Post')
    , sharp = require('sharp')
    , path = require('path')
    , fs = require('fs')
    , stream = require('getstream');

module.exports = {
  /**
   * Retorna todos os posts feitos no App em ordem decrescente por data de criação.
   */
  async index(req, res) {
    const posts = await Post.find().sort('-createdAt');

    return res.json(posts);
  }, 

  /**
   * Recebe os dados do arquivo e outros dados restantes do post.
   */
  async store(req, res) {

    const { site, name, title,contents, hashtags } = req.body;
    const { filename: image } = req.file;

    const [fname] = image.split('.');
    const fileName = `${ fname }.jpg`;

    // getStream.io Dashboard Connect
    var streamClient = stream.connect('b9ae2fjtacfz','cszna5ep76cdngz35fm6rvrkkxa82drwntkqhqc6bn4vcbkycb8e5hvs6serz6ra','70534');
    
    // Activity setting
    var activity = {
      actor: 'user:chosunBiz',
      verb: 'add',
      object: `upload:${1}`,
      foreign_id: `upload:${1}`,
    };
    
    // user feed get
    var timelineFeed = streamClient.feed(
            'user',
						'chosunBiz',
    );
    
    // timeline feed그룹에 세팅한 activity 추가.
    timelineFeed
					.addActivity(activity)
					.then(function(response) {
            //cb(null, result);
            console.log('success!!');
					})
					.catch(function(err) {
						console.log(err);
					});

    console.log("timelineFeed = " +timelineFeed);


    // Redimensiona e trata a imagem postada.
    await sharp(req.file.path)
      .resize(500)
      .jpeg({ quality: 70 })
      .toFile(
        path.resolve(req.file.destination, 'resized', fileName)
      )

    // Deleta a imagem de tamanho original.
    fs.unlinkSync(req.file.path);

    // Salva o post dentro do BD.
    const post = await Post.create({
      site,
      name,
      title,
      contents,
      hashtags,
      image: fileName
    });

    // Envia a informação de que o Post foi realizado em tempo real para os outros usuários com a mensagem 'post'.
    req.io.emit('post', post);

    return res.json(post);
  }
};