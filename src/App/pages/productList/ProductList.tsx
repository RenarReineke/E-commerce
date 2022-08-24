import { FC, useEffect, useState } from "react";

import { PRODUCTS } from "@config/apiUrls";
import { Product } from "@config/types";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const result = await axios({
        method: "get",
        url: PRODUCTS,
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

export default ProductList;
