const express = require("express");
const User = require("../models/User.model");
const fetchdata = require("../middleware/fetchuser");
const { default: mongoose } = require("mongoose");
const router = express.Router();
fetchdata;

// get all user
router.get("/fetchalluser", async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {}
});

// get single user
router.get("/fetchuser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "provide correct id" });
    }
    const user = await User.find({ _id: id });
    if (!user) {
      return res
        .status(404)
        .json({ error: "Not any user available with this id." });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
  }
});

// post a user
router.post("/createuser", async (req, res) => {
  try {
    const { name, email, number } = req.body;
    const user = await User.create({ name, email, number });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// updating a user
router.put("/update/:id", async (req, res) => {
  try {
    const { name, email, number } = req.body;

    const newUser = {};
    if (name) {
      newUser.name = name;
    }
    if (email) {
      newUser.email = email;
    }
    if (number) {
      newUser.number = number;
    }

    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("Not Found");
    }
    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: newUser },
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    console.log(error.message);
  }
});

// delete a user
router.delete("/delete/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("Not Found");
    }

    user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "No such user available" });
    }
    res.status(200).json({ message: "deleted", user });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
