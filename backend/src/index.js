const express = require('express')
    , mongoose = require('mongoose')
    , path = require('path')
    , cors = require('cors')
    , config = require('./config/config');

const app = express();

// Cria suporte aos protocolos HTTP e WebSocket (permitindo comunicação real-time) à API.
const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect(config.DB_URL, {
  useNewUrlParser: true
});

// Passamos o WebSocket para todas as rotas, tendo acesso à variável io dentro de todos os Controllers.
app.use((req, res, next) => {
  req.io = io;

  next();
});

// Permite que aplicações de diferentes domínios possam acessar a API.
app.use(cors());

// Cria uma rota que permite acessar os arquivos de imagem estáticos salvos na aplicação.
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));
app.use('/profile', express.static(path.resolve(__dirname, '..', 'uploads', 'profile')));

app.use(require('./routes'));

/**
 * Método que escuta a porta especificada no localhost.
 */
server.listen(3333);