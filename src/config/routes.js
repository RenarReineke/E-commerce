/* eslint-disable import/no-anonymous-default-export */
import { INDEX, PRODUCT } from "@config/urls";
import ProductCard from "@pages/productCard";
import ProductList from "@pages/productList";
import { Routes, Route } from "react-router-dom";

export default () => {
  return (
    <Routes>
      <Route path={INDEX} element={<ProductList />} />
      <Route path={PRODUCT} element={<ProductCard />} />
    </Routes>
  );
};
