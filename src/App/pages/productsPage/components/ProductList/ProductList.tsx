import { FC } from "react";

import Card from "@components/Card";
import { Product } from "@config/types";
import { Link } from "react-router-dom";

import style from "./ProductList.module.scss";

type ProductListProps = {
  products: Product[];
};

const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <ul className={style.list}>
      {products.map((item) => (
        <li key={item.id}>
          <Link to={`/product/${item.id}`}>
            <Card
              title={item.title}
              subtitle={item.description}
              image={item.image}
              price={item.price}
              category={item.category}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
