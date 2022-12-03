import { Schema, model } from "mongoose";

// Create an interface representing a document in MongoDB.
interface IRecipe {
  code: string;
  productName: string;
  date: Date;
  ingredients: [
    {
      name: string;
      quantityPurchase: number;
      cost: number;
      quantityUsed: number;
      totalCost: number;
    }
  ];
  totalBatchCost: number;
  sellingPrice: number;
}

// Create a Schema corresponding to the document interface.
const recipeSchema = new Schema<IRecipe>({
  code: { type: String, required: true },
  productName: { type: String, required: true },
  date: { type: Date, default: Date.now },
  ingredients: {
    type: [
      {
        name: String,
        quantityPurchase: Number,
        cost: Number,
        quantityUsed: Number,
        totalCost: Number,
      },
    ],
    required: true,
  },
  totalBatchCost: { type: Number },
  sellingPrice: { type: Number, required: true },
});

// Create a Model.
const Recipe = model<IRecipe>("Recipe", recipeSchema);

export default Recipe;
