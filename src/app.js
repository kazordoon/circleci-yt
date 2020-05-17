import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/products', (req, res) => {
  // Listar todos os produtos
});

app.post('/products', (req, res) => {
  // Criar novo produto
});

app.put('/products/:id', (req, res) => {
  // Atualizar produto pelo "id"
});

app.delete('/products/:code', (req, res) => {
  // Excluir produto pelo "code"
});

app.post('/products/:code/love', (req, res) => {
  // Desenvolver incremento de "love" por "code"
});

app.get('/products/:code', (req, res) => {
  // Listar produtos pelo "code"
});

app.set('PORT', process.env.PORT || 3333);
app.set('HOST', process.env.HOST || 'localhost');

export default app;
