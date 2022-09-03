import { FC, useEffect } from "react";

import WithLoader from "@components/WithLoader";
import ProductsStore from "@store/ProductsStore";
import { useLocalStore } from "@utils/useLocalStore";
import { toJS } from "mobx";
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

  /* eslint-disable no-console */
  console.log("Render products page: ", toJS(store.products), toJS(store.meta));

  return (
    <div className={style.container}>
      <Header />
      <div className={style.title}>
        <h1>Total Product</h1>
        <span className={style.count}>{totalProducts}</span>
      </div>
      {/* <WithLoader loading={loading}>
        <ProductList products={paginatedProducts} />
      </WithLoader> */}

      <ProductList products={store.paginatedProducts}></ProductList>

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
