import { DTExtraIngredients } from "./DTExtraIngredients";
import { DTProduct } from "./DTProduct";

export interface DTCart {
  product?: DTProduct,
  extras: Array<DTExtraIngredients>,
  remove: Array<string>,
  cant: number,
  total: number
}