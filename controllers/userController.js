const { User } = require("../models/user.model");

const userController = (app, urlencodedParser) => {
  app.get("/users", (req, res) => {
    //get data from mongodb and pass to the view
    User.find({}, (err, data) => {
      if (err) console.log(err.message);
      res.json(data);
    });
  });
  app.post("/user", urlencodedParser, (req, res) => {
    let user = new User();
    user.name = req.body.user;
    user.save((err, data) => {
      if (err) res.json(err.message);
      res.json(data);
    });
  });
  app.post("/user/delete", urlencodedParser, (req, res) => {
    //To delete a single  item from mongoDb
    let item = { _id: req.body.id };
    User.deleteOne(item, (err, data) => {
      if (err) throw err;
      res.json(data);
    });

    // To delete multiple users
    // let users = { item: req.body.item };
    // User.deleteMany(users, (err, data) => {
    //   if (err) console.log(err.message);
    //   res.json(data);
    // });
  });
};

module.exports = { userController };
