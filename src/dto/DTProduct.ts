import { DTExtraIngredients } from "./DTExtraIngredients";

export interface DTProduct {
  _id: string,
  name: string,
  description: string,
  price: number,
  image: string,
  category: string,
  ingredients: Array<string>,
  extras: Array<{ name: string, price: number }>,
}