const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/relation")
  .then(() => console.log("connected to mongodb"))
  .catch(() => console.log("could not connect"));

const bookSchema =  new mongoose.Schema({
  title: String,
  pages: Number
});
const Book = mongoose.model("Book", bookSchema);

const User = mongoose.model('User', new mongoose.Schema({
  first_name: String,
  last_name: String,
  books: [bookSchema]
}));

async function createUser(first_name, last_name, books){
  const user = new User({
    first_name,
    last_name,
    book: books
  });

  const result = await user.save();
  console.log(result);
}


async function getUsers(){
  const users = await User.find();
  console.log(users);
}

async function updateUser(id){
  const user = await User.update({_id : id}, {
    $unset:{
      'book': ''
    }
  });
}

async function addBook(userId, book){
  const user = await User.findById(userId);
  user.books.push(book);
  await user.save();
}

async function removeBook(userId, bookId){
  const user = await User.findById(userId);
  const book = user.books.id(bookId);
  book.remove();
  await user.save();
}

// createUser('mohammad', 'seyedAghaei', [
//   new Book({title:'nodejs progamming', pages: 100}),
//   new Book({title:'react progamming', pages: 150}),
//   new Book({title:'mongodb tutorial', pages: 200})
// ]);

// addBook('616d6cf194c1e2a6523436c4', new Book({title:'js tutorial', pages: 300}))
// updateUser('616d6b30bc27b5c4e188f5ee')
// getUsers()
removeBook('616d6cf194c1e2a6523436c4','616d6dae396eab3c16ce4b82');

