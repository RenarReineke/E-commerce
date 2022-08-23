import React, { FC, useState, useEffect } from "react";

import axios from "axios";
import { useParams } from "react-router-dom";

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

export const ProductCard: FC = () => {
  const initialValue: Product = {
    id: 0,
    title: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    rating: {
      count: 0,
      rate: 0,
    },
  };

  const [product, setProduct] = useState<Product>(initialValue);
  const { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: `https://fakestoreapi.com/products/${id}`,
      });
      setProduct(result.data);
    };

    fetch();
  }, [id]);
  return (
    <div>
      ProductCard:
      <div>{product.title}</div>
    </div>
  );
};
