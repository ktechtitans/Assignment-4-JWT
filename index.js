require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

// Importing route handlers
const authRoutes = require("./src/routes/userRoutes");
const recipeRoutes = require("./src/routes/recipeRoutes");

const app = express();

// Setting up the port to listen on 3000 or from .env port
const PORT = process.env.PORT || 3000;
const MongodbURI = "mongodb+srv://Kanchan:Kanchan@cluster0.v3lhx.mongodb.net/";

// Updated MongoDB connection
mongoose
  .connect(MongodbURI)
  .then(() => console.log("Successfully Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Parsing JSON requests
app.use(express.json());

// Route handlers with base URLs
app.use("/api/user", authRoutes); // Base URL for User Auth
app.use("/api/recipe", recipeRoutes); // Base URL for Recipe

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
