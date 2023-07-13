const express = require('express');
const session = require('express-session');
const mysql = require('mysql');
const app = express();

const checkAuth = (req, res, next) => {
  if (req.session.authenticated) {
    // Se o usuário estiver autenticado, chama o próximo middleware
    checkUserExists(req, res, next);
  } else {
    // Se o usuário não estiver autenticado, redireciona para a página de login
    res.redirect('/login');
  }
};

const checkUserExists = (req, res, next) => {
  const username = req.session.username;

  connection.query('SELECT * FROM users WHERE name = ?', [username], (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta: ' + error);
      res.status(500).json({ error: 'Erro na consulta' });
    } else {
      if (results.length > 0) {
        next();
      } else {
        res.redirect('/login');
      }
    }
  });
};

app.use(session({
  secret: '123',
  resave: false,
  saveUninitialized: true
}));

const connection = mysql.createConnection({
  host: 'bykmdyd0uwwcfqziausm-mysql.services.clever-cloud.com',
  user: 'ucdayuilal4kdckf',
  password: 'R3KZssVnq6ZipGCnWMIf',
  database: 'bykmdyd0uwwcfqziausm',
  port: '3306'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados: ' + err.stack);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados.');
});

app.use(express.json());

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
  });

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/register.html');
  });

app.get('/menu', checkAuth, (req, res) => {
    res.sendFile(__dirname + '/menu.html');
  });

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

 connection.query('SELECT * FROM users WHERE name = ? AND pass = ?', [username, password], (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta: ' + error);
    }else{
      console.log('Resultado da consulta:', results);
      if(results.length > 0){
        req.session.authenticated = true;
        req.session.username = username;
        res.json({ success: true});
      }else{
        res.json({ success: false});
      }
    }
  }); 
});

app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  connection.query('INSERT INTO users (name,pass) values (?,?)', [username, password], (error, results) => {
    if (error) {
      console.error('Erro ao executar a insert: ' + error);
     // res.status(500).json({ error: 'Erro na consulta' }); 
    }else{
      console.log('Resultado do insert:', results);
      if(results.affectedRows > 0){
        res.json({ success: true});
      }else{
        res.json({ success: false});
      }
    }
  }); 

});

app.get('/products', (req, res) => {
  connection.query('SELECT * FROM products', (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta: ' + error);
      res.status(500).json({ error: 'Erro na consulta' });
    } else {
      res.json(results);
    }
  });
});

app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));

app.listen(3000, () => {
console.log('Servidor iniciado na porta 3000.');
});



