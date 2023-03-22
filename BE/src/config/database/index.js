const mongoose = require("mongoose");
mongoose.set('strictQuery', false);     //remove
async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/test");
    console.log("Connect Successfully !!!");
  } catch (error) {
    console.log(error, "Error DATABASE !!!");
  }
}

module.exports = { connect };

// "mongodb+srv://mern:mern@cluster0.vsixibg.mongodb.net/mern?retryWrites=true&w=majority",
// {
//   // tu tim hieu
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// }