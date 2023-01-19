const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

// const DBConnect = require("./utils/dbConnect");

const app = require("./app");
mongoose.connect(process.env.ATLAS_URI).then(()=>{
  console.log('db conected'.red.bold);
})
// database connection
// DBConnect();

// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

