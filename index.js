// Express is used to create the API
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
let bodyParser = require("body-parser");
// const morgan = require("morgan");
let { todoController } = require("./controllers/todoController");
let { userController } = require("./controllers/userController");

const corsConfig = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
};

const app = express();
// app.use(cors());
app.use(corsConfig);
app.use(bodyParser.json());
let urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(morgan("tiny"));

// fire Controllers
todoController(app, urlencodedParser);
userController(app, urlencodedParser);

// if (config.seedData) {
//   seederService.seedData();
// }

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
