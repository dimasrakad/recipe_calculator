import { NextFunction, Request, Response } from "express";
import Recipe from "../model.js";

export const destroy = (req: Request, res: Response, next: NextFunction) => {
  try {
    Recipe.findByIdAndDelete(req.url.toString().substring(1))
      .then(() => {
        res.status(204).json();
      })
      .catch((e) => next(e));
  } catch (error) {
    next(error);
  }
};
