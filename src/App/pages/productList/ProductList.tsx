import React, { FC, useEffect, useState } from "react";

import { ProductCard } from "@pages/productCard";
import axios from "axios";
import { Link } from "react-router-dom";

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

export const ProductList: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: "https://fakestoreapi.com/products",
      });
      setProducts(result.data);
    };

    fetch();
  }, []);

  return (
    <div>
      <ul>
        {products.map((item) => (
          <li key={item.id}>
            <Link to={`product/${item.id}`}>item.title</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
