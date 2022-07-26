const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {
  registerValidation,
  loginValidation,
} = require("../validation/validation");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // validating user
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  //checking if email exist
  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) return res.status(400).json("Email already exist");

  //hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //creating new user
  const user = new User({
    name,
    email,
    password: hashedPassword,
  });
  try {
    const u1 = await user.save();
    res.json({
      name: u1.name,
      email: u1.email,
      date: u1.date,
    });
  } catch (err) {
    res.send(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userType = ["user", "admin", "company"];
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  //checking if email exist
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json("User does't exist.");

  //checking the user password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.status(400).json("Invalid credential.");

  //creating jwt token
  const token = jwt.sign(
    { _id: user._id, user_type: userType[Math.floor(Math.random() * 3)] },
    process.env.TOKEN_SECRET
  );
  res.json({ access_token: token });
});

module.exports = router;
