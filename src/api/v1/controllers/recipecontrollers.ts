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

