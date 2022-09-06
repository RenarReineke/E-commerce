import { FC } from "react";

import ArrowLeftIcon from "@components/ArrowLeftIcon";
import ArrowRightIcon from "@components/ArrowRightIcon";
import ProductsStore from "@store/ProductsStore";
import { observer } from "mobx-react-lite";

import PaginationItem from "./components/PaginationItem";
import style from "./Pagination.module.scss";

type PaginationProps = {
  store: ProductsStore;
  url: string;
};

const Pagination: FC<PaginationProps> = ({ store, url }) => {
  return (
    <div className={style.container}>
      <ul className={style.list}>
        <li className={style["item-arrow"]}>
          <ArrowLeftIcon />
        </li>
        {store.pages.map((page) => (
          <PaginationItem
            key={page}
            page={page}
            url={`${url}?page=${page}`}
            currentPage={store.currentPage}
          />
        ))}
        <li className={style["item-arrow"]}>
          <ArrowRightIcon />
        </li>
      </ul>
    </div>
  );
};

export default observer(Pagination);
