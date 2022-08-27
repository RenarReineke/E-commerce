/* eslint-disable import/no-anonymous-default-export */
import { INDEX, PRODUCT } from "@config/urls";
import ProductDetailPage from "@pages/productDetailPage";
import ProductsPage from "@pages/productsPage";
import { Routes, Route } from "react-router-dom";

export default () => {
  return (
    <Routes>
      <Route path={INDEX} element={<ProductsPage />} />
      <Route path={PRODUCT} element={<ProductDetailPage />} />
    </Routes>
  );
};
