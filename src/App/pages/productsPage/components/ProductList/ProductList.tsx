import { FC } from "react";

import Card from "@components/Card";
import { Product } from "@config/types";

import style from "./ProductList.module.scss";

type ProductListProps = {
  products: Product[];
};

const ProductList: FC<ProductListProps> = ({ products }) => {
  return (
    <ul className={style.list}>
      {products.map((item) => (
        <li key={item.id}>
          <Card
            id={item.id}
            title={item.title}
            subtitle={item.description}
            image={item.image}
            price={item.price}
            category={item.category}
          />
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
