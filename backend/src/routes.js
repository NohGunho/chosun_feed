const express = require('express')
    , multer = require('multer')
    , PostController = require('./controllers/PostController')
    , LikeController = require('./controllers/LikeController')
    , TokenController = require('./controllers/TokenController')
    , uploadsConfig = require('./config/upload');

const routes = new express.Router();
const upload = multer(uploadsConfig);

//routes.get('/posts', PostController.index);
routes.get('/posts', PostController.index);
routes.post('/posts', upload.single('image'), PostController.store);
routes.post('/posts/:id/like', LikeController.store);
routes.get('/getToken/:id,:feedName', TokenController.store);

module.exports = routes;


