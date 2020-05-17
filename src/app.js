import express from 'express';
import cors from 'cors';
import { uuid } from 'uuidv4';

const app = express();

app.use(express.json());
app.use(cors());

let products = [];

app.get('/products', (req, res) => {
  // Listar todos os produtos
});

app.post('/products', (req, res) => {
  // Criar novo produto
  const { code, description, buyPrice, sellPrice, tags } = req.body;

  if (!code || !description || !buyPrice || !sellPrice || !tags) {
    return res.status(406).json({ error: 'Incorrect request body.' });
  }

  let product = products.find(product => product.code === code);
  if (product) {
    return res.status(409).json({ error: 'This product already exists.' });
  }

  product = {
    id: uuid(),
    code,
    description,
    buyPrice,
    sellPrice,
    tags,
    lovers: 0,
  };
  products.push(product);

  return res.status(201).json({ product });
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
