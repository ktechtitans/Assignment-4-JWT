
const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/authMiddleware");
const { validateRecipe } = require("../middleware/middleware");
const {
  getAllRecipes,
  createRecipe,
  getRecipeByID,
  deleteRecipeById,
  updateRecipe,
} = require("../controller/recipeController");

//Routes for recipe CRUD wuth JWT token verification middleware
router.get("/", authenticateJWT, getAllRecipes);
router.post("/", authenticateJWT, validateRecipe, createRecipe);
router.get("/:id", authenticateJWT, getRecipeByID);
router.delete("/:id", authenticateJWT, deleteRecipeById);
router.put("/:id", authenticateJWT, validateRecipe, updateRecipe);

module.exports = router;
