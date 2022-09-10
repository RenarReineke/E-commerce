export type ProductModel = {
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
