const mongoose = require("mongoose");

const eggsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  companyName: {
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
  soliq: {
    type: String
  },
  date: {
    day: {
      type: String
    },
    month: {
      type: String
    },
    year: {
      type: String
    }
  },
  time: {
    type: String
  },
  status: {
    type: String
  },
  defective: {
    type: String
  },
  unfertilized: {
    type: String
  },
  defectiveChicken: {
    type: String,
    default: "0"
  }
});

const Eggs = mongoose.model("eggs", eggsSchema);

module.exports = Eggs;
