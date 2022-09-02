import { FC, useState, useEffect } from "react";

import Button from "@components/Button";
import { ButtonColor } from "@components/Button";
import WithLoader from "@components/WithLoader";
import { PRODUCTS } from "@config/apiUrls";
import { Product } from "@config/types";
import Navbar from "@pages/productsPage/components/Header/components/Navbar";
import ProductList from "@pages/productsPage/components/ProductList";
import ProductsStore from "@store/ProductsStore";
import { useLocalStore } from "@utils/useLocalStore";
import axios from "axios";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import style from "./ProductDetailPage.module.scss";

// const initialValue: Product = {
//   id: 0,
//   title: "",
//   description: "",
//   price: 0,
//   image: "",
//   category: "",
//   rating: {
//     count: 0,
//     rate: 0,
//   },
// };

const ProductDetailPage: FC = () => {
  // const [loading, setLoading] = useState(false);
  // const [{ image, title, description, price, category }, setProduct] =
  //   useState<Product>(initialValue);
  // const [relatedProducts, setRelatedProducts] = useState<Product[]>([
  //   initialValue,
  // ]);

  const store = useLocalStore(() => new ProductsStore());

  const { id } = useParams();

  useEffect(() => {
    store.getProductItem(id);
  }, [store, id]);

  /* eslint-disable no-console */
  console.log(
    "Render productItem page: ",
    toJS(store.productItem),
    toJS(store.meta)
  );

  // useEffect(() => {
  //   if (loading) return;
  //   const getProduct = async () => {
  //     const result = await axios({
  //       method: "get",
  //       url: `${PRODUCTS}/${id}`,
  //     });
  //     setLoading(false);
  //     setProduct(result.data);
  //   };

  //   const getRelatedProducts = async () => {
  //     const result = await axios({
  //       method: "get",
  //       url: `${PRODUCTS}/category/${category}/?limit=3`,
  //     });
  //     setLoading(false);
  //     setRelatedProducts(result.data);
  //   };

  //   getProduct().then(() => getRelatedProducts());
  // }, [id, category, loading]);

  return (
    <div className={style.container}>
      <Navbar />

      <section className={style.main}>
        <img src={store.productItem?.image} alt={store.productItem?.title} />
        <div className={style["main-info"]}>
          <h1 className={style["main-title"]}>{store.productItem?.title}</h1>
          <p className={style["main-subtitle"]}>Combination of wood and wool</p>
          <p className={style["main-color-title"]}>Color</p>
          <div className={style.color}>
            <div className={style["color-black"]}></div>
            <div className={style["color-green"]}></div>
            <div className={style["color-yellow"]}></div>
            <div className={style["color-white"]}></div>
          </div>
          <p className={style["main-description"]}>
            {store.productItem?.description}
            <div className={style["main-description-more"]}>Read More</div>
          </p>
          <div className={style["main-price"]}>${store.productItem?.price}</div>
          <div className={style["main-button-wrapper"]}>
            <Button className="button-large">Buy now</Button>
            <Button className="button-large" color={ButtonColor.secondary}>
              Add to cart
            </Button>
          </div>
        </div>
      </section>
      {/* <section className={style["related-items"]}>
        <h2 className={style.title}>Related items</h2>
        <div className={style.wrapper}>
          {store.getRelatedProducts.length > 1 && (
            <ProductList
              products={store.getRelatedProducts(store.productItem?.category)}
            />
          )}
        </div>
      </section> */}
      {/* <WithLoader loading={loading}>
        <section className={style.main}>
          <img src={image} alt={title} />
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
            <p className={style["main-description"]}>
              {description}
              <div className={style["main-description-more"]}>Read More</div>
            </p>
            <div className={style["main-price"]}>${price}</div>
            <div className={style["main-button-wrapper"]}>
              <Button className="button-large">Buy now</Button>
              <Button className="button-large" color={ButtonColor.secondary}>
                Add to cart
              </Button>
            </div>
          </div>
        </section>
      </WithLoader>

      <WithLoader loading={loading}>
        <section className={style["related-items"]}>
          <h2 className={style.title}>Related items</h2>
          <div className={style.wrapper}>
            {relatedProducts.length > 1 && (
              <ProductList products={relatedProducts} />
            )}
          </div>
        </section>
      </WithLoader> */}
    </div>
  );
};

export default observer(ProductDetailPage);
