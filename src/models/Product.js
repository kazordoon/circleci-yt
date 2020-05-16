class Product {
  /**
   * Product
   * @param {string} description
   * @param {string} buyPrice
   * @param {number} sellPrice
   * @param {number} stock
   */
  constructor(description, buyPrice, sellPrice, stock) {
    this.description = description;
    this.buyPrice = buyPrice;
    this.sellPrice = sellPrice;
    this.stock = stock;
  }
}

export default Product;
