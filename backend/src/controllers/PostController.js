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
    //console.log(req.params.id);
    //const posts = await Post.find({"name":`${req.params.id}`}).sort('-createdAt');
    

    //const posts = await Post.find().sort('-createdAt');
    // axios 에서 파라미터 가져오는 방법 req.query.id
    const posts = await Post.find({"name":`${req.query.id}`}).sort('-createdAt');

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
    var streamClient = stream.connect('p5mv3rqjj4u6','qbanwcyuyvts8s48vtbhphc645zbv7fzudvdp6wvjxjbd77msunquxf2z7hzw2te','70719');
    
    // Activity setting
    var activity = {
      actor: `${name}`,
      verb: 'insert',
      object: `${title}`,
      title: `${title}`,
      contents: `${contents}`,
      imageUrl : `${fileName}`
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
            console.log('success!!');
					})
					.catch(function(err) {
						console.log(err);
					});
          
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