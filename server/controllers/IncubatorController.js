const Eggs = require("../models/Eggs");
const Users = require("../models/Users");

exports.registerEggs = async (req, res) => {
  console.log("registering eggs");
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 4) {
      return res.status(400).json({message: "Not allowed"});
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
      unfertilized: req.body.unfertilized,
    });
    await newEggs.save();
    return res.status(200).json({message: "Eggs registered"});
  } catch (error) {
    console.log(error);
  }
};
exports.getEggs = async (req, res) => {
  console.log("getting eggs");
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 4) {
      return res.status(400).json({message: "Not allowed"});
    }
    const eggs = await Eggs.find({status: "0"}).sort({_id: -1}).limit(20);
    return res.status(200).json(eggs);
  } catch (error) {
    console.log(error);
  }
};
exports.getEggsAll = async (req, res) => {
  console.log("getting eggs All");
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({message: "Not allowed"});
    }
    const eggs = await Eggs.find().sort({_id: -1}).limit(20);
    return res.status(200).json(eggs);
  } catch (error) {
    console.log(error);
  }
};
exports.getEggsById = async (req, res) => {
  console.log("getting eggs by id");
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 4) {
      return res.status(400).json({message: "Not allowed"});
    }
    const eggs = await Eggs.findById(req.params.id);
    return res.status(200).json(eggs);
  } catch (error) {
    console.log(error);
  }
};
exports.editEggsById = async (req, res) => {
  console.log("editing eggs by id");
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 4) {
      return res.status(400).json({message: "Not allowed"});
    }
    const eggs = await Eggs.findById(req.params.id);
    eggs.defective = req.body.defective;
    eggs.unfertilized = req.body.unfertilized;
    eggs.status = req.body.status;
    await eggs.save();
    return res.status(200).json(eggs);
  } catch (error) {
    console.log(error);
  }
};
exports.getChickens = async (req, res) => {
  console.log("getting chickens");
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level!== 4) {
      return res.status(400).json({message: "Not allowed"});
    }
    const chickens = await Eggs.find({status: "1"}).sort({_id: -1}).limit(20);
    return res.status(200).json(chickens);
  } catch (error) {
    console.log(error);
  }
};
exports.editChickenById = async (req, res) => {
  console.log("editing Chicken by id");
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 4) {
      return res.status(400).json({message: "Not allowed"});
    }
    const eggs = await Eggs.findById(req.params.id);
    eggs.defectiveChicken = req.body.defectiveChicken;
    eggs.status = req.body.status;
    await eggs.save();
    return res.status(200).json(eggs);
  } catch (error) {
    console.log(error);
  }
};