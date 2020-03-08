// let { Types, Schema, mongoose } = require("../config/server.");
let { Schema, mongoose } = require("../config/server.");
const FKHelper = require("./helpers/foreign-key-helper");

//create a schema - this is like a blueprint
const todoSchema = new Schema({
  item: { type: String, required: true },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    validate: {
      validator: function(v) {
        return FKHelper(mongoose.model("User"), v);
      },
      message: `User doesn't exist`
    }
  }, //Foreign key definition
  created: { type: Date, default: Date.now, required: true }
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = { Todo };
