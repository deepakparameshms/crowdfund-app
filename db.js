const mongoose = require("mongoose");
require("dotenv").config();
const URI = "mongodb://localhost:27017";

const connectToMongo = () => {
  try {
    mongoose.connect(
      URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (err) => {
        if (err) throw err;
        console.log("Connected to mongodb");
      }
    );
  } catch (err) {
    console.log(err);
  }
};
module.exports = connectToMongo;
