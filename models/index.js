// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
  //foreign key established
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  
});
// Categories have many Products
  //foreign key established

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});
// Products belongToMany Tags (through ProductTag)
  //foreign key established

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
});
// Tags belongToMany Products (through ProductTag)
  //foreign key established
  
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
