
const { DataTypes } = require('sequelize');
const sequelize = require('./db'); 

const Product = sequelize.define('Product', {
  Product_id:{
    type: DataTypes.STRING,
    allowNull:false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
Product.sync()
.then(()=>{
    console.log('success');
})
  .catch((err)=>{
      console.log(err);
  })

module.exports = Product;
