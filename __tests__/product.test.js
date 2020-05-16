import Product from '../src/models/Product';
import sell from '../src/services/sellProduct';

describe('Product', () => {
  it('should not sell any products', () => {
    const product = new Product('PC Gamer', 1500, 1900, 10);
    sell(product, 0);
    expect(product.stock).not.toBe(9);
  });

  it('should sell a product from stock', () => {
    const product = new Product('PC Gamer', 1500, 1900, 10);
    sell(product, 1);
    expect(product.stock).toBe(9);
  });
});
