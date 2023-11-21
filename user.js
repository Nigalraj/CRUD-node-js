const Sequelize = require('./db');
const { DataTypes } = require('sequelize');

const User = Sequelize.define('Users', {
    emp_id:{
      type:DataTypes.STRING,
      allowNull:false,
      primaryKey:true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    roll:{
      type: DataTypes.STRING,
      allowNull:false
    }
},{
     timestamps:false
});

User.sync()
.then(()=>{
    console.log('success');
})
  .catch((err)=>{
      console.log(err);
  })

module.exports=User;
