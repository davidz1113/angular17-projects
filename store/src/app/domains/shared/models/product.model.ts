import { ICategory } from "./category.model";

export interface IProduct {
  id: number;
  title: string;
  price: number;
  images: string[];
  creationAt: string;
  description: string;
  category: ICategory;
}
