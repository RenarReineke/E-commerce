import { FC, useEffect } from "react";

import Button from "@components/Button";
import { ButtonColor } from "@components/Button";
import WithLoader from "@components/WithLoader";
import Navbar from "@pages/productsPage/components/Header/components/Navbar";
import ProductList from "@pages/productsPage/components/ProductList";
import ProductsStore from "@store/ProductsStore";
import { Meta } from "@utils/meta";
import { useLocalStore } from "@utils/useLocalStore";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import style from "./ProductDetailPage.module.scss";

const ProductDetailPage: FC = () => {
  const store = useLocalStore(() => new ProductsStore());

  const { id } = useParams();

  useEffect(() => {
    store.getProductItem(id);
  }, [store, id]);

  return (
    <div className={style.container}>
      <Navbar />

      <WithLoader loading={store.meta === Meta.loading}>
        <section className={style.main}>
          <img src={store.productItem?.image} alt={store.productItem?.title} />
          <div className={style["main-info"]}>
            <h1 className={style["main-title"]}>{store.productItem?.title}</h1>
            <p className={style["main-subtitle"]}>
              Combination of wood and wool
            </p>
            <p className={style["main-color-title"]}>Color</p>
            <div className={style.color}>
              <div className={style["color-black"]}></div>
              <div className={style["color-green"]}></div>
              <div className={style["color-yellow"]}></div>
              <div className={style["color-white"]}></div>
            </div>
            <div className={style["main-description"]}>
              {store.productItem?.description}
              <div className={style["main-description-more"]}>Read More</div>
            </div>
            <div className={style["main-price"]}>
              ${store.productItem?.price}
            </div>
            <div className={style["main-button-wrapper"]}>
              <Button className="button-large">Buy now</Button>
              <Button className="button-large" color={ButtonColor.secondary}>
                Add to cart
              </Button>
            </div>
          </div>
        </section>
        <section className={style["related-items"]}>
          <h2 className={style.title}>Related items</h2>
          <div className={style.wrapper}>
            <ProductList products={store.products} />
          </div>
        </section>
      </WithLoader>
    </div>
  );
};

export default observer(ProductDetailPage);
