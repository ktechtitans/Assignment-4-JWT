
 const validateRecipe = (req, res, next) => {
    const {
      recipeName,
      ingredients,
      cookingTime,
      difficulty,
      cuisine,
      description,
      photoLink,
      averageRating,
    } = req.body;
  
    // Check for missing or empty fields
    if (
      !recipeName ||
      !ingredients ||
      !cookingTime ||
      !difficulty ||
      !cuisine ||
      !description ||
      !averageRating
    ) {
      return res
        .status(400)
        .send(
          "Missing any of the required fileds recipeName, ingredients, cookingTime,difficulty, cuisine, description,photoLink,averageRating"
        );
    }
  
    next();
  };
  
  /**User validation middleware
   * Check if all the required data is recived or not and also check password length
   **/
  const validateUser = (req, res, next) => {
    const { email, username, password } = req.body;
  
    if (!email || !username || !password) {
      res.status(400).send("All fields are required");
      return;
    }
    if (password.length < 6) {
      res.status(400).send("Password must be at least 6 chars long");
      return;
    }
    next();
  };
  
  module.exports = { validateRecipe, validateUser };
  