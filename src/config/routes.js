import { ProductCard } from "@pages/productCard";
import { ProductList } from "@pages/productList";
import { Routes, Route } from "react-router-dom";

import App from "../App";

export default () => {
  return (
    <Routes>
      <Route path="/" element={App} />
      <Route path="/products" element={ProductList} />
      <Route path="/products/:id" element={ProductCard} />
    </Routes>
  );
};
