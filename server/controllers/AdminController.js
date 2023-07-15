const Users = require("../models/Users");
const passwordGenerator = require("../functions/userFunctions.js");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const Drugs = require("../models/Drugs");
const Dizenfeksiya = require("../models/Dizenfeksiya");

exports.index = async (req, res) => {
  await res.json({ message: "Hello World!" });
};
exports.registerUser = async (req, res) => {
  console.log("RegisterUser");
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }

    const { name, surname, user_level, phone_number } = req.body;
    if (!name || !surname || !user_level || !phone_number) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    let isUnique = false;
    let randomLogin = "";

    while (!isUnique) {
      randomLogin = passwordGenerator.generator(7);
      const existingUser = await Users.findOne({ login: randomLogin });
      if (!existingUser) {
        isUnique = true;
      }
    }

    const newUser = await Users({
      name,
      surname,
      user_level,
      phone_number,
      login: randomLogin,
      password: passwordGenerator.generator(5),
    });

    await newUser.save();
    return res.json({ message: "User created successfully", newUser });
  } catch (error) {
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  console.log("LoginUser");
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  try {
    const user = await Users.findOne({ login });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Wrong password" });
    }
    const token = jwt.sign({ data: user._id }, "anjumanbonu0321", {
      expiresIn: "12h",
    });
    return res.json({ message: "User logged in successfully", token });
  } catch (error) {
    console.log(error);
  }
};
exports.userInfo = async (req, res) => {
  console.log("userInfo", req.userId);
  try {
    const user = await Users.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User found", user });
  } catch (error) {
    console.log(error);
  }
};
exports.getUsers = async (req, res) => {
  console.log("getUser", req.userId);
  const currentUser = await Users.findById(req.userId);
  if (!currentUser || currentUser.user_level !== 1) {
    return res.status(400).json({ message: "Not allowed" });
  }
  try {
    const users = await Users.find();
    if (!users) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
exports.getUserById = async (req, res) => {
  console.log("getUserById", req.userId);
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const user = await Users.findById(req.params.id);
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};
exports.editUserById = async (req, res) => {
  console.log("editUserById", req.userId);
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.user_level = req.body.user_level;
    user.phone_number = req.body.phone_number;
    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};
exports.deleteUserById = async (req, res) => {
  console.log("deleteUserById", req.userId);
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    await Users.deleteOne({ _id: req.params.id });
    return res.json({ msg: "delete succesfully" });
  } catch (error) {
    console.log(error);
  }
};
exports.sms = async (req, res) => {
  console.log("sms", req.body);
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const sms = [
      {
        phone: currentUser.phone_number,
        text: req.body.text,
      },
    ];

    const data = new URLSearchParams();
    data.append("login", encodeURIComponent("samandar"));
    data.append("password", encodeURIComponent("gJlv405114TAidbzf9uz"));
    data.append("data", JSON.stringify(sms));

    axios
      .post("http://185.8.212.184/smsgateway/", data)
      .then((response) => {
        return res.json(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log(error);
  }
};
exports.createDrugs = async (req, res) => {
  console.log("createDrugs", req.body);
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const newDrugs = new Drugs({
      name: req.body.name,
      price: req.body.price,
      type: req.body.type,
      min_limit: req.body.min_limit,
    });
    await newDrugs.save();
    return res.json(newDrugs);
  } catch (error) {
    console.log(error);
  }
};
exports.getDrugs = async (req, res) => {
  console.log("getDrugs", req.userId);
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const drugs = await Drugs.find();
    return res.json(drugs);
  } catch (error) {
    console.log(error);
  }
};
exports.editDrugById = async (req, res) => {
  console.log("editDrugById", req.userId);
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const drug = await Drugs.findById(req.params.id);
    if (!drug) {
      return res.status(404).json({ message: "Drug not found" });
    }
    drug.name = req.body.name;
    drug.price = req.body.price;
    drug.type = req.body.type;
    drug.min_limit = req.body.min_limit;
    await drug.save();
    return res.json(drug);
  } catch (error) {
    console.log(error);
  }
};
exports.deleteDrugById = async (req, res) => {
  console.log("deleteDrugById", req.userId);
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    await Drugs.deleteOne({ _id: req.params.id });
    return res.json({ msg: "delete succesfully" });
  } catch (error) {
    console.log(error);
  }
};
exports.getDrugsById = async (req, res) => {
  console.log("getDrugsById", req.userId);
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const drug = await Drugs.findById(req.params.id);
    if (!drug) {
      return res.status(404).json({ message: "Drug not found" });
    }
    return res.json(drug);
  } catch (error) {
    console.log(error);
  }
};
exports.createdizenfeksiya = async (req, res) => {
  console.log("createdizenfeksiya", req.body);
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const newDrugs = new Dizenfeksiya({
      name: req.body.name,
      price: req.body.price,
      type: req.body.type,
      min_limit: req.body.min_limit,
    });
    await newDrugs.save();
    return res.json(newDrugs);
  } catch (error) {
    console.log(error);
  }
};
exports.getdizenfeksiya = async (req, res) => {
  console.log("getdizenfeksiya", req.userId);
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const drugs = await Dizenfeksiya.find();
    return res.json(drugs);
  } catch (error) {
    console.log(error);
  }
};
exports.editdizenfeksiyaById = async (req, res) => {
  console.log("editdizenfeksiyaById", req.userId);
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const drug = await Dizenfeksiya.findById(req.params.id);
    if (!drug) {
      return res.status(404).json({ message: "Drug not found" });
    }
    drug.name = req.body.name;
    drug.price = req.body.price;
    drug.type = req.body.type;
    drug.min_limit = req.body.min_limit;
    await drug.save();
    return res.json(drug);
  } catch (error) {
    console.log(error);
  }
};
exports.deletedizenfeksiyaById = async (req, res) => {
  console.log("deletedizenfeksiyaById", req.userId);
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    await Dizenfeksiya.deleteOne({ _id: req.params.id });
    return res.json({ msg: "delete succesfully" });
  } catch (error) {
    console.log(error);
  }
};
exports.getdizenfeksiyaById = async (req, res) => {
  console.log("getdizenfeksiyaById", req.userId);
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const drug = await Dizenfeksiya.findById(req.params.id);
    if (!drug) {
      return res.status(404).json({ message: "Drug not found" });
    }
    return res.json(drug);
  } catch (error) {
    console.log(error);
  }
};
exports.sms_verfication = async (req, res) => {
  console.log("sms_verfication", req.userId);
  try {
    const currentUser = await Users.findById(req.userId);
    if (!currentUser || currentUser.user_level !== 1) {
      return res.status(400).json({ message: "Not allowed" });
    }
    const code = Math.floor(10000 + Math.random() * 90000);
    currentUser.verification_code = code;
    await currentUser.save();

    const sms = [
      {
        phone: currentUser.phone_number,
        text: "Your verification code is " + code,
      },
    ];

    const data = new URLSearchParams();
    data.append("login", encodeURIComponent("samandar"));
    data.append("password", encodeURIComponent("gJlv405114TAidbzf9uz"));
    data.append("data", JSON.stringify(sms));

    axios
      .post("http://185.8.212.184/smsgateway/", data)
      .then((response) => {
        return res.json(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.log(error);
  }
};
