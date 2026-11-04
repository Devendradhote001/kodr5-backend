require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const UserModel = require("./models/user.model");
connectDB();

const cookieParser = require("cookie-parser");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.post("/register", async (req, res) => {
  try {
    // 1. get data from body
    let { name, email, password, mobile } = req.body;

    // 2. validate that data
    if (!name || !email || !password)
      return res.status(400).json({
        success: false,
        message: "All fileds are required",
      });

    //   3. check user exists or not
    let isExists = await UserModel.findOne({ email });

    // 4. return error when user exists
    if (isExists)
      return res.status(409).json({
        message: "Email is already exists",
        success: false,
      });

    //   5. password hash
    let hashPass = bcrypt.hashSync(password, 12);

    // 6. save user in db
    let user = await UserModel.create({
      name,
      email,
      password: hashPass,
      mobile,
    });

    // 7. generate token
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // 8. save token in cookies
    res.cookie("tala", token);

    // 9. send the res
    return res.status(201).json({
      success: true,
      message: "User registred successfully",
      data: user,
    });

    return res.send(user);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    // 1. get data from body
    let { email, password } = req.body;

    // 2. validate that data
    if (!email || !password)
      return res.status(400).json({
        success: false,
        message: "All fileds are required",
      });

    //   3. check user exists or not
    let isExists = await UserModel.findOne({ email });

    // 4. return error when user exists
    if (!isExists)
      return res.status(404).json({
        message: "user not found",
        success: false,
      });

    //   5. check password
    let checkPass = bcrypt.compareSync(password, isExists.password);

    if (!checkPass)
      return res.status(400).json({
        message: "Invalid credentials",
        success: false,
      });

    // 6. generate token
    let token = jwt.sign({ id: isExists._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // 7. save token in cookies
    res.cookie("tala", token);

    // 8. send the res
    return res.status(201).json({
      success: true,
      message: "user logged in",
      data: isExists,
    });

    return res.send(user);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = app;
