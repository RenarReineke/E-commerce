import { FC, useState, useEffect } from "react";

import WithLoader from "@components/WithLoader";
import { PRODUCTS } from "@config/apiUrls";
import { Product } from "@config/types";
import { getPaginator, limit } from "@utils/paginationUtils";
import axios from "axios";
import { useLocation } from "react-router-dom";

import Header from "./components/Header";
import Pagination from "./components/Pagination";
import ProductList from "./components/ProductList";
import style from "./ProductsPage.module.scss";

const ProductsPage: FC = () => {
  const location = useLocation();
  const [currentPage, offset] = getPaginator(location.search);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const totalCount = products.length;
  const paginatedProducts = products.slice(offset, limit);

  /* eslint-disable no-console */
  console.log("RENDER!!! ");

  useEffect(() => {
    if (loading) return;
    const getProduct = async () => {
      const result = await axios({
        method: "get",
        url: PRODUCTS,
      });
      setLoading(false);
      setProducts(result.data);
    };

    getProduct();

    /* eslint-disable no-console */
    console.log("EFFECT!!!");
  }, [loading, currentPage]);

  /* eslint-disable no-console */
  console.log("products: ", products);

  return (
    <div className={style.container}>
      <Header />
      <div className={style.title}>
        <h1>Total Product</h1>
        <span className={style.count}>{totalCount}</span>
      </div>
      <WithLoader loading={loading}>
        <ProductList products={paginatedProducts} />
      </WithLoader>

      <Pagination
        total={totalCount}
        limit={limit}
        url={location.pathname}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProductsPage;
