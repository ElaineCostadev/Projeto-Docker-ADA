const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());


const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error('Erro de conexão com o banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados MySQL');
  }
});

// Rotas para manipular operações TODO
app.get('/todos', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao buscar TODOs do banco de dados' });
    } else {
      res.json(results);
    }
  });
});

app.post('/todos', (req, res) => {
  const { description, is_completed } = req.body;
  db.query('INSERT INTO todos (description, is_completed) VALUES (?, ?)', [description, is_completed], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Erro ao adicionar TODO ao banco de dados' });
    } else {
      res.json({ id: result.insertId, description, is_completed });
    }
  });
});

app.delete('/todos/:id', (req, res) => {
  const todoId = req.params.id;
  db.query('DELETE FROM todos WHERE id = ?', [todoId], (err, result) => {
    if (err) {
      console.error('Erro ao remover TODO do banco de dados:', err);
      res.status(500).json({ error: 'Erro ao remover TODO do banco de dados' });
    } else {
      console.log('TODO removido com sucesso:', todoId);
      res.json({ message: 'TODO removido com sucesso' });
    }
  });
});

app.put('/todos/:id', (req, res) => {
  const todoId = req.params.id;
  const { is_completed } = req.body;

  db.query('UPDATE todos SET is_completed = ? WHERE id = ?', [is_completed, todoId], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar status do TODO:', err);
      res.status(500).json({ error: 'Erro ao atualizar status do TODO' });
    } else {
      console.log('Status do TODO atualizado com sucesso:', todoId);
      res.json({ message: 'Status do TODO atualizado com sucesso' });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});