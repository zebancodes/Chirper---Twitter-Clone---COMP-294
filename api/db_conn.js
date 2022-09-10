require("dotenv").config({ path: "./.env" });

const mongoose = require("mongoose");

var uri = process.env.ATLAS_URI;
console.log("Connecting to " + uri);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(uri, options).then(
  () => {
    console.log("Database connection established!");
  },
  (err) => {
    {
      console.log("Error connecting Database instance due to:", err);
    }
  }
);
