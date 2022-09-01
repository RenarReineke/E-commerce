import { ProductModel } from "./product";

export type ProductApiModel = {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: {
    count: number;
    rate: number;
  };
};

export const normalizeProductModel = (raw: ProductApiModel): ProductModel => ({
  id: raw.id,
  title: raw.title,
  description: raw.description,
  price: raw.price,
  image: raw.image,
  category: raw.category,
  rating: {
    count: raw.rating.count,
    rate: raw.rating.rate,
  },
});
