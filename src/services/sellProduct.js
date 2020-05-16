import Product from '../models/Product';

/**
 * A quantidade vendida pode ser de 1 ou mais unidades.
 * 
 * --> Se o estoque ficar negativo, uma exceção deve ser lançada.
 * 
 * --> O valor de venda não pode ser maior do que o valor de compra
 * @param {Product} product 
 * @param {number} amount 
 * @return {Product} product
 */
function sellProduct(product, amount) {
  product.stock -= amount;
  return product;
}

export default sellProduct;
