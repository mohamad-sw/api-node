const express = require("express");
let users = require("./users");
const app = express();

app.get("/api/users", (req, res) => {
  res.json({
    data: users,
    message: "ok",
  });
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if(!user) return res.json({data: null, message:'the user with the given id was not found'});
  res.json({
    data: user,
    message: "ok",
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
