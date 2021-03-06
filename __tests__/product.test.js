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

  it('should not update a product with a nonexistent ID', async () => {
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

  it('should not delete a product with a nonexistent ID', async () => {
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

  it('should list a product with a specifific code', async () => {
    const createProduct = {
      code: 510,
      description: 'PC Gamer 4',
      buyPrice: 1800,
      sellPrice: 2000,
      tags: ['PC'],
    };
    // 1
    await request(app)
      .post('/products')
      .send(createProduct);
    // 2
    await request(app)
      .post('/products')
      .send(createProduct);

    const productCode = createProduct.code;
    const response = await request(app).get(`/products/${productCode}`);

    expect(response.status).toBe(200);
    expect(response.body.products).toBeDefined();
    expect(response.body.products).toHaveLength(2);
  });

  it('should not list a product with an invalid code', async () => {
    const invalidCode = 'I_am_an_invalid_code';
    const response = await request(app).get(`/products/${invalidCode}`);

    expect(response.status).toBe(204);
  });

  it('should increment "lovers" of the products with the given code', async () => {
    const createProduct = {
      code: 5,
      description: 'PC Gamer 5',
      buyPrice: 1800,
      sellPrice: 2000,
      tags: ['PC'],
    };

    await request(app)
      .post('/products')
      .send(createProduct);
    const productCode = createProduct.code;

    // Before increment love
    const productBeforeResponse = await request(app)
      .get(`/products/${productCode}`);
    const [productBefore] = productBeforeResponse.body.products;

    const response = await request(app)
      .post(`/products/${productCode}/love`);

    // After increment love
    const productAfterResponse = await request(app)
      .get(`/products/${productCode}`);
    const [productAfter] = productAfterResponse.body.products;

    expect(response.status).toBe(200);
    expect(productAfter.lovers).toBeGreaterThan(productBefore.lovers);
  });
});
