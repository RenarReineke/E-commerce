import React, { FC, useState, useEffect } from "react";

import Card from "@components/Card";
import { PRODUCTS } from "@config/apiUrls";
import { Product } from "@config/types";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductCard: FC = () => {
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
        url: `${PRODUCTS}/${id}`,
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

export default ProductCard;
