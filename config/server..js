const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Types = Schema.Types;

// const URL =
//   "mongodb+srv://todo:todoSecret@project-pdueu.mongodb.net/test?retryWrites=true&w=majority";
const URL = "mongodb://127.0.0.1:27017/todo";
//connect to the database
mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(error => {
    console.error("connection error:", err);
  });
const db = mongoose.connection;

db.once("open", _ => {
  console.log("Database connected:", URL);
});

module.exports = { Schema, mongoose };
// module.exports = { Types, Schema, mongoose };
