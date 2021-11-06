const express = require('express');
let users = require('./users');
const app = express();

app.get('/api/users', (req,res)=>{
  res.json({
    data: users,
    message: "ok"
  });
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on port ${port}`));