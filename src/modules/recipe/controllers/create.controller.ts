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
    
    const resep = await recipe.save();

<<<<<<< HEAD
    const finalResponse = {
      productName: resep.productName,
      totalPreserve: resep.totalBatchCost,
      sellingPricePerServe: resep.sellingPrice,
      grossProfit: (resep.sellingPrice - resep.totalBatchCost)/resep.sellingPrice * 100,
      totalGeneratedProfit: resep.sellingPrice - resep.totalBatchCost,
    };
    res.status(201).json(finalResponse);
=======
    await recipe
      .save()
      .then((recipe) => {
        const finalResponse = {
          id: recipe._id,
          productName: recipe.productName,
          totalPreserve: recipe.totalBatchCost,
          sellingPricePerServe: recipe.sellingPrice,
          grossProfit: (recipe.sellingPrice - recipe.totalBatchCost)/recipe.sellingPrice * 100,
          totalGeneratedProfit: recipe.sellingPrice - recipe.totalBatchCost,
        };
        res.status(201).json(finalResponse);
      })
      .catch((e) => next(e));
>>>>>>> 34443f4bf466d8f5f3bf9804855a3b182779cc67
  } catch (error) {
    next(error);
  }
};
