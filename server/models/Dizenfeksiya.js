const mongoose = require("mongoose");

const dizenfeksiyaSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  quantity: {
    type: String,
    default: "0"
  },
  price: {
    type: String,
    default: "0"
  },
  type: {
    type: String
  },
  min_limit: {
    type: String
  }
});
const Dizenfeksiya = mongoose.model("dizenfeksiya", dizenfeksiyaSchema);

module.exports = Dizenfeksiya;
