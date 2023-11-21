const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const User = require('./user')
const Product = require('./product')


const app = express();
const port = 3000;

const secretKey = 'yourSecretKey';

app.use(bodyParser.json());

app.post('/prod_reg', async (req, res) => {
  try {
      const { Product_id, name, price } = req.body;
      const user = await Product.create({ name, price, Product_id });
      const value = user.get();
      res.send( value );
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/prod_mod', verified, async (req, res) => {
  const {roll} = req.user
  if (roll === "CEO" || roll === "HR") {
    try {
      const { name, price, Product_id } = req.body;
      await Product.update(
        { name, price },
        { where: { Product_id }, returning: true }
      );
      res.status(200).send('Update success');
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    console.log("Access Denied");
    res.send("You do not have access to update products.");
  }
});

app.delete('/pro_drop',verified,async(req,res)=>{
  const {roll} = req.user;
  console.log(roll);
  if (roll === "CEO" || roll === "HR")
  {
     try
     {
       const {product_id} = req.body;
       const deleteR = await Product.destroy({
       where:{product_id}
     })

     if(deleteR===0)
     {
       res.status(404).send("Data not found")
     }
      res.status(400).send('Delete successfully')
     }
     catch
       {
         res.status(404).send('Error_1')
        }
  }
  else{
    console.log("Access Denied");
    res.send("Access Denied")
  }
})


app.post('/register', async (req, res) => {
  try {
      const { emp_id, username, email, roll } = req.body;
      const token = jwt.sign({ username, roll, emp_id }, secretKey, { expiresIn: '1h' });

      console.log(token, "res");
      console.log(username);
      const user = await User.create({ username, email, roll, emp_id });

      const value = user.get();

      res.send({ token, value });
  } catch (error) {
     
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


app.delete('/drop',verified,async(req,res)=>{
  try
  {
  const {emp_id} = req.user;
  const deleteR = await User.destroy({
    where:{emp_id}
  })

  if(deleteR===0)
  {
    res.status(404).send("Data not found")
  }
  res.status(400).send('Delete successfully')
  }
  catch
  {
    res.status(404).send('Error')
  }
})

app.put('/showtable', verified, async (req, res) => {
  try {
    const { username, email, password, roll } = req.body;
    const { emp_id } = req.user; 

    await User.update(
      { username, email, password, roll },
      { where: { emp_id }, returning: true }
    );
    
    res.status(200).send('Update success');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

function verified(req, res, next) {
  const token = req.headers['authorization'];
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'Token is not found' });
  }

  jwt.verify(token.split(' ')[1], secretKey, (err, dec) => {
    if (err) {
      res.status(401).json({ error: 'Authorization error' });
    } else {
      req.user = dec;
      next();
    }
  });
}

app.listen(port, () => {
  console.log(`Server is running `);
});
