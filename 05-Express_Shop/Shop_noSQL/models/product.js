const getDB = require('../util/database').getDB;

class Product {
  constructor (title, imageUrl, price, description) {
    this.title = title;
    this.price = price;
    this.desctription = description;
    this.imageUrl = imageUrl;
  }

  save() {
      const db = getDB();
      return db.collection('products')
      .insertOne(this)
      .then(results => {
        console.log(results);
      })
      .catch(err => console.log(err));
  }
}
module.exports = Product;
