import request from 'supertest';

import app from '../src/app';

describe('Product', () => {
  it('should create a new product', async () => {
    const product = {
      code: 1,
      description: 'PC Gamer',
      buyPrice: 1800,
      sellPrice: 2000,
      tags: ['PC'],
    };
    const response = await request(app)
      .post('/products')
      .send(product);

    expect(response.status).toBe(201);
    expect(response.body.product.id).toBeDefined();
  });

  it('should return the HTTP status code "406" trying to sending incorrect request body', async () => {
    const invalidProduct = {
      foo: 'bar',
    };

    const response = await request(app)
      .post('/products')
      .send(invalidProduct);

    expect(response.status).toBe(406);
  });

  it('should update an existing product', async () => {
    const createProduct = {
      code: 2,
      description: 'PC Gamer 2',
      buyPrice: 1800,
      sellPrice: 2000,
      tags: ['PC'],
    };
    let response = await request(app)
      .post('/products')
      .send(createProduct);
    const productId = response.body.product.id;

    const updateProduct = {
      description: 'Notebook Gamer'
    };
    response = await request(app)
      .put(`/products/${productId}`)
      .send(updateProduct);

    expect(response.status).toBe(200);
    expect(response.body.product.id).toBe(productId);
  });

  it('should not to update a product with a nonexistent ID', async () => {
    const updateProduct = {
      description: 'X-Burger',
      buyPrice: 1,
      sellPrice: 5,
    };
    const invalidId = 'I_am_an_invalid_id';
    const response = await request(app)
      .put(`/products/${invalidId}`)
      .send(updateProduct);

    expect(response.status).toBe(404);
  });

  it('should delete a product', async () => {
    const createProduct = {
      code: 4,
      description: 'PC Gamer 4',
      buyPrice: 1800,
      sellPrice: 2000,
      tags: ['PC'],
    };
    let response = await request(app)
      .post('/products')
      .send(createProduct);
    const productCode = response.body.product.code;

    response = await request(app)
      .delete(`/products/${productCode}`);

    expect(response.status).toBe(204);
  });

  it('should not to delete a product with a nonexistent ID', async () => {
    const updateProduct = {
      description: 'Chair',
      buyPrice: 7,
      sellPrice: 15,
    };
    const invalidId = 'I_am_an_invalid_id';
    const response = await request(app)
      .delete(`/products/${invalidId}`)
      .send(updateProduct);

    expect(response.status).toBe(404);
  });

  it('should list all products', async () => {
    const response = await request(app).get('/products');

    expect(response.status).toBe(200);
    expect(response.body.products).toBeDefined();
    expect(Array.isArray(response.body.products)).toBe(true);
  });
});
