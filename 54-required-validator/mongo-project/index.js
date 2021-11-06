const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/mongoproject")
  .then(() => console.log("connected to mongodb"))
  .catch((err) => console.log("could not connect to mongodb"));

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: { type: String, required: true },
  favorites: [String],
  data: { type: Date, default: Date.now },
  admin: Boolean,
});

const User = mongoose.model("User", userSchema);

async function createUser() {
  const user = new User({
    first_name: "yaser",
    // last_name: "seydAhei",
    favorits: ["productivity", "programming", "music"],
    admin: false,
  });

  try {
    const result = await user.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message)
  }

  
}

async function getUsers() {
  const users = await User.find();
  console.log(users);
}

async function updateUser(id){
  const result = await User.findByIdAndUpdate(id, {
    $set:{
      first_name: 'updated name 4'
    }
  }, {new: true});

  console.log(result);
}

async function removeUser(id){
  const user = await User.findByIdAndRemove(id);
  console.log(user);
}


createUser();
// getUsers();
// updateUser("616cfe3a45c01a2b540a4e64");
// removeUser("616cfe3a45c01a2b540a4e64");
