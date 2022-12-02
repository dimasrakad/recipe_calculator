import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import Recipe from "../model.js";

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Connect DB
    await mongoose.connect("mongodb://localhost:27017/recipe-calculator");

    const ingredients = req.body.ingredients;

    // Logic
    let totalBatchCost = 0;
    ingredients.forEach(
      (element: {
        cost: number;
        quantityPurchase: number;
        quantityUsed: number;
        totalCost: number;
      }) => {
        const totalCost =
          (element.cost / element.quantityPurchase) * element.quantityUsed;
        element.totalCost = totalCost;
        //
        totalBatchCost += totalCost;
      }
    );
    const totalGeneratedProfit = req.body.sellingPrice - totalBatchCost;
    const grossProfit = (totalGeneratedProfit / req.body.sellingPrice) * 100;

    // Validation
    if (ingredients.length <= 0) {
      res.status(400).json("Error, Ingredient tidak boleh kosong");
    } else if (req.body.productName === "" || null) {
      res.status(400).json("Error, productName tidak boleh kosong");
    } else if (req.body.sellingPrice === "" || null) {
      res.status(400).json("Error, sellingPrice tidak boleh kosong");
    } else {
      // Query
      await Recipe.findOneAndUpdate(
        { _id: new ObjectId(req.params.id) },
        {
          $set: {
            productName: req.body.productName,
            date: Date.now(),
            ingredients: req.body.ingredients,
            sellingPrice: req.body.sellingPrice,
            totalBatchCost: totalBatchCost,
          },
        },
        { new: true }
      )
        .then((result) => {
          // Respons
          const finalResponse = {
            productName: result?.productName,
            totalPreserve: totalBatchCost,
            sellingPricePerServe: result?.sellingPrice,
            grossProfit: grossProfit,
            totalGeneratedProfit: totalGeneratedProfit,
          };
          res.status(200).json(finalResponse);
        })
        .catch((e) => next(e));
    }
  } catch (error) {
    next(error);
  }
};
