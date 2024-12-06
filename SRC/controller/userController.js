require('dotenv').config();
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Registers a new user.
 * - Validates the input fields (email, password, username).
 * - Checks if the email is already registered.
 * - Saves the new user to the database.
 */
const registerUser = async (req, res) => {
    const { email, password, username } = req.body;
  
    if (!email || !password || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
  
    const user = new User({ email, password, username });
    try {
      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error occurred");
    }
  };

  /**
 * Authenticates a user and generates a JWT token.
 * - Validates the input fields (email, password).
 * - Checks if the user exists and the password is correct.
 * - Returns a signed JWT token upon successful authentication.
 */

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body.password)
    try {
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const isPasswordValid = await user.isValidPassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error occurred");
    }
  };


  /**
 * Desc: Logout function
 *Parameter:
 *   res : Destroy the session and logout message sent
 */
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out user" });
      }
      res.status(200).json({ message: "Logout successful" });
    });
  };
  
  module.exports = { registerUser, loginUser, logoutUser };
  