import React from "react";

import { ProductCard } from "@pages/productCard";
import { ProductList } from "@pages/productList";
// import Routes from "@config/routes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div>Hello ecomerce</div>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductCard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
