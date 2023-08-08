// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsto(Category, {
  foreignKey: "product_id",
  onDelete: "CASCADE",
});
// Categories have many Products
Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});
// Products belongToMany Tags (through ProductTag)
ProductTag.belongToMany(Product, {
  foreignKey: "product_id",
  onDelete: "CASCADE"
})
// Tags belongToMany Products (through ProductTag)
ProductTag.belongToMany(Tag, {
  foreignKey: "tag_id",
  onDelete: "CASCADE"
})
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
