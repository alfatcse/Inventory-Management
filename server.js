const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

// const DBConnect = require("./utils/dbConnect");

const app = require("./app");
// mongoose.connect(process.env.DB).then(()=>{
//   console.log('db conected'.red.bold);
// })
// database connection
// DBConnect();
const mongoAtlasUri =
  "mongodb+srv://WildPhotoReview:TOBNNF502Sk6ILlZ@cluster0.icjdeya.mongodb.net/?retryWrites=true&w=majority";

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    mongoAtlasUri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected"),
  );
} catch (e) {
  console.log("could not connect");
}

const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));
// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

