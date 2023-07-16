const Eggs = require("../models/Eggs");
const Users = require("../models/Users");

exports.registerEggs = async(req, res) => {
  console.log("registering eggs");
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 4) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const newEggs = new Eggs({
      name: req.body.name,
      companyName: req.body.companyName,
      quantity: req.body.quantity,
      price: req.body.price,
      allPrice: req.body.allPrice,
      soliq: req.body.soliq,
      withSoliq: req.body.withSoliq,
      date: req.body.date,
      time: req.body.time,
      status: req.body.status,
      defective: req.body.defective,
      unfertilized: req.body.unfertilized
    });
    await newEggs.save();
    return res.status(200).json({ message: "Eggs registered" });
  } catch (error) {
    console.log(error);
  }
};
exports.getEggs = async(req, res) => {
  console.log("getting eggs");
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 4) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const eggs = await Eggs.find().sort({ _id: -1 }).limit(20);
    return res.status(200).json(eggs);
  } catch (error) {
    console.log(error);
  }
};