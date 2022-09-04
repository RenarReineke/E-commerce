import { FC, useEffect } from "react";

import WithLoader from "@components/WithLoader";
import ProductsStore from "@store/ProductsStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";

import Header from "./components/Header";
import Pagination from "./components/Pagination";
import ProductList from "./components/ProductList";
import style from "./ProductsPage.module.scss";

const ProductsPage: FC = () => {
  const location = useLocation();

  const store = useLocalStore(() => new ProductsStore());

  const totalProducts = store.products.length;

  useEffect(() => {
    store.getProducts({});
  }, [store]);

  return (
    <div className={style.container}>
      <Header />
      <div className={style.title}>
        <h1>Total Product</h1>
        <span className={style.count}>{totalProducts}</span>
      </div>

      <WithLoader loading={store.meta === Meta.loading}>
        <ProductList products={store.paginatedProducts}></ProductList>
      </WithLoader>

      <Pagination
        total={totalProducts}
        limit={store.limit}
        url={location.pathname}
        currentPage={store.currentPage}
      />
    </div>
  );
};

export default observer(ProductsPage);
