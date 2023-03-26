const mongoose = require("mongoose");
mongoose.set("strictQuery", false); //remove
async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1/test");
    mongoose.connection.on("reconnected", () => {
      console.log("Mongo has reconnected");
    });
    mongoose.connection.on("error", (error) => {
      console.log("Mongo connection has an error", error);
      mongoose.disconnect();
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Mongo connection is disconnected");
    });
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
