const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Employees', 'root', '9361', {
  dialect: 'mysql',
});

module.exports=sequelize;
