import { NextFunction, Request, Response } from "express";
import Recipe from "../model.js";

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let result = 0;

    const recipe = new Recipe({
      code: req.body.code,
      productName: req.body.productName,
      sellingPrice: req.body.sellingPrice,
      ingredients: req.body.ingredients.map(
        (ingredients: {
          name: string;
          quantityPurchase: number;
          cost: number;
          quantityUsed: number;
          totalCost: number;
        }) => {
          result += (ingredients.cost * ingredients.quantityUsed) / ingredients.quantityPurchase;
          return {
            name: ingredients.name,
            quantityPurchase: ingredients.quantityPurchase,
            cost: ingredients.cost,
            quantityUsed: ingredients.quantityUsed,
            totalCost: (ingredients.cost * ingredients.quantityUsed) / ingredients.quantityPurchase,
          };
        }
      ),
      totalBatchCost: result,
    });

    await recipe
      .save()
      .then((recipe) => {
        res.status(201).json(recipe);
      })
      .catch((e) => next(e));
  } catch (error) {
    next(error);
  }
};
