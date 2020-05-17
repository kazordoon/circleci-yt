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

  it('should not to create a duplicated product', async () => {
    const product = {
      code: 1,
      description: 'PC Gamer',
      buyPrice: 1800,
      sellPrice: 2000,
      tags: ['PC'],
    };
    const response1 = await request(app)
      .post('/products')
      .send(product);

    const response2 = await request(app)
      .post('/products')
      .send(product);

    expect(response2.status).toBe(409);
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
});
