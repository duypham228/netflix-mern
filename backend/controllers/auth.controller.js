import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: "Invalid email" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters",
      });
    }

    const existingUserByEmail = await User.findOne({ email });

    if (existingUserByEmail) {
      return res
        .status(400)
        .json({ success: false, error: "Email already exists" });
    }

    const existingUserByUsername = await User.findOne({ username });

    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    res.status(201).json({
      success: true,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (error) {
    console.error(`Error in signup controller: ${error.message}`);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, error: "Invalid credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res
        .status(404)
        .json({ success: false, error: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: "",
      },
    });
  } catch (error) {
    console.error(`Error in signin controller: ${error.message}`);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-netflix");
    res.status(200).json({ success: true, message: "Signout successfully" });
  } catch (error) {
    console.error(`Error in signout controller: ${error.message}`);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
