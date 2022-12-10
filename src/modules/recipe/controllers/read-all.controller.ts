import { NextFunction, Request, Response } from "express";
import Recipe from "../model.js";

export const readAll = (req: Request, res: Response, next: NextFunction) => {
  try {
    Recipe.find()
      .then((recipes) => {
        if(recipes.length == 0){
          res.status(200).json('No Data');
        }else{
          res.status(200).json(recipes);

        }
      })
      .catch((e) => next(e));
  } catch (error) {
    next(error);
  }
};
