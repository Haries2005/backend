const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const JWT_SECRET = "mySecretKey";

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.status(201).json({ token, user: { id: user._id, username, email } });
  } catch (err) {
    console.error(\"Signup error:\", err);
    res.status(500).json({ error: \"Signup failed at server\" });
  }
});

module.exports = router;
