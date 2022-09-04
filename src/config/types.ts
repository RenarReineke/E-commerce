export type Product = {
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

export type ProductListProps = Product[];

export type ApiResp<SuccessData = any, ErrorData = any> =
  | { isError: false; data: SuccessData }
  | { isError: true; data: ErrorData };
