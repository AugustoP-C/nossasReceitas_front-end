const express = require('express');
const path = require('path');

const app = express();

// Servir arquivos estáticos
app.use(express.static(__dirname));

// Rota para a página de login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login', 'login.html'));
});

// Porta onde o front será servido
app.listen(8080, () => {
  console.log('Front-end disponível em http://localhost:8080');
});

