const { Todo } = require("../models/todo.model");
const { User } = require("../models/user.model");

const todoController = (app, urlencodedParser) => {
  app.post("/user/todo/", urlencodedParser, (req, res) => {
    //get data from mongodb and pass to the view
    User.findOne({ name: req.body.user }, (err, data) => {
      let userId = data._id;
      Todo.find({ user_id: userId }, (err, data) => {
        if (err) console.log(err.message);
        res.json({ data: data, id: userId });
      });
    });
    // // Another method is to use the byName query which was dev in the user model
    // User.findOne()
    //   .byName(req.body.user)
    //   .exec(function(err, data) {
    //     let userId = data._id;
    //     Todo.find({ user_id: data._id }, (err, data) => {
    //       if (err) console.log(err.message);
    //       res.json({ data: data, id: userId });
    //     });
    //   });
  });

  app.post("/todo", urlencodedParser, (req, res) => {
    //get data from the view and add to mongodb
    let todo = new Todo();
    todo.item = req.body.item;
    todo.user_id = req.body.user;
    todo.save((err, data) => {
      if (err) res.json(err.message);
      res.json(data);
    });
  });

  app.post("/todo/delete", urlencodedParser, (req, res) => {
    //To delete a single  item from mongoDb
    let item = { _id: req.body.item };
    Todo.deleteOne(item, (err, data) => {
      if (err) throw err;
      res.json(data);
    });
    // To delete multiple items
    // let items = { item: req.body.item };
    // Todo.deleteMany(items, (err, data) => {
    //   if (err) console.log(err.message);
    //   res.json(data);
    // });
  });
};

module.exports = { todoController };
