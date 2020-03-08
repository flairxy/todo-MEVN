// let { Types, Schema, mongoose } = require("../config/server.");
let { Schema, mongoose } = require("../config/server.");

//create a schema - this is like a blueprint
const userSchema = new Schema({
  name: { type: String, required: true },
  created: { type: Date, default: Date.now, required: true }
});

//Optional query helpers
userSchema.query.byName = function(name) {
  return this.where({ name: new RegExp(name, "i") });
};

userSchema.query.byId = function(id) {
  return this.where({ _id: new RegExp(id, "i") });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };
