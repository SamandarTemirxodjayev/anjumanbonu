const mongoose = require("mongoose");

const drugsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  quantity: {
    type: String,
    default: "0"
  }
});
const Drugs = mongoose.model("drugs", drugsSchema);

module.exports = Drugs;
