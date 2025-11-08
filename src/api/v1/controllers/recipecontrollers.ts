import { Request, Response } from "express";
import { db } from "../config/firebase";

const collection = db.collection("recipes");

export const getAllRecipes = async (req: Request, res: Response) => {
  const snapshot = await collection.get();
  const recipes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  res.json(recipes);
};

export const getRecipeById = async (req: Request, res: Response) => {
  const doc = await collection.doc(req.params.id).get();
  if (!doc.exists) return res.status(404).json({ message: "Recipe not found" });
  res.json({ id: doc.id, ...doc.data() });
};

export const createRecipe = async (req: Request, res: Response) => {
  const newRecipe = await collection.add(req.body);
  res.status(201).json({ id: newRecipe.id });
};

export const updateRecipe = async (req: Request, res: Response) => {
  await collection.doc(req.params.id).update(req.body);
  res.json({ message: "Recipe updated" });
};

export const deleteRecipe = async (req: Request, res: Response) => {
  await collection.doc(req.params.id).delete();
  res.json({ message: "Recipe deleted" });
};
