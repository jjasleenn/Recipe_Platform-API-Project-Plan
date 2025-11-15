import express from "express";
import {getAllRecipes, getRecipeById, createRecipe, updateRecipe, deleteRecipe} from "../controllers/recipecontrollers";

const router = express.Router();

router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.post("/", createRecipe);
router.put("/:id", updateRecipe);
router.delete("/:id", deleteRecipe);

export default router;
