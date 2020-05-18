import express from 'express';
import cors from 'cors';
import { uuid } from 'uuidv4';

const app = express();

app.use(express.json());
app.use(cors());

let products = [];

app.get('/products', (req, res) => {
  // Listar todos os produtos
  return res.json({ products });
});

app.post('/products', (req, res) => {
  // Criar novo produto
  const { code, description, buyPrice, sellPrice, tags } = req.body;

  if (!code || !description || !buyPrice || !sellPrice || !tags) {
    return res.status(406).json({ error: "Incorrect request body." });
  }

  const createProduct = {
    id: uuid(),
    code,
    description,
    buyPrice,
    sellPrice,
    tags,
    lovers: 0,
  };

  const productWithTheCode = products.find(
    (product) => product.code === createProduct.code
  );
  if (productWithTheCode) {
    createProduct.lovers = productWithTheCode.lovers;
  }

  products.push(createProduct);

  return res.status(201).json({ product: createProduct });
});

app.put('/products/:id', (req, res) => {
  // Atualizar produto pelo "id"
  const { code, description, buyPrice, sellPrice, tags } = req.body;
  const { id } = req.params;

  const items = { code, description, buyPrice, sellPrice, tags };

  const productIndex = products.findIndex(product => product.id === id);

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  const product = products[productIndex];
  let updatedProduct = {};

  for (let key in items) {
    if (items[key]) {
      updatedProduct[key] = items[key];
    }
  }

  updatedProduct = {
    ...product,
    ...updatedProduct,
  };

  products.splice(productIndex, 1, updatedProduct);

  return res.json({ product: updatedProduct });
});

app.delete('/products/:code', (req, res) => {
  // Excluir produto pelo "code"
  const { code } = req.params;

  const productIndex = products.findIndex(product => product.code === Number(code));

  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  products = products.filter(product => product.code !== Number(code));

  return res.sendStatus(204);
});

app.post('/products/:code/love', (req, res) => {
  // Desenvolver incremento de "love" por "code"
  const { code } = req.params;

  const productExists = (products.findIndex(product => product.code === Number(code)) !== -1);
  if (!productExists) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  products = products.map(product => {
    if (product.code === Number(code)) {
      product.lovers++;
    }

    return product;
  });

  return res.sendStatus(200);
});

app.get('/products/:code', (req, res) => {
  // Listar produtos pelo "code"
  const { code } = req.params;

  const product = products.find(product => product.code === Number(code));
  if (!product) {
    return res.status(204).json({ error: 'Product not found' });
  }

  const productsWithTheCode = products.filter(product => product.code === Number(code));

  return res.json({ products: productsWithTheCode });
});

app.set('PORT', process.env.PORT || 3333);
app.set('HOST', process.env.HOST || 'localhost');

export default app;
