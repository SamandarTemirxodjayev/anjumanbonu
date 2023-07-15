const mongoose = require("mongoose");

const drugsSchema = new mongoose.Schema({
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
const Drugs = mongoose.model("drugs", drugsSchema);

module.exports = Drugs;
