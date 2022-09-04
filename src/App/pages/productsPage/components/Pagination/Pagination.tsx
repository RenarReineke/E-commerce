import { FC } from "react";

import { range } from "@utils/paginationUtils";

import PaginationItem from "./components/PaginationItem";
import style from "./Pagination.module.scss";

type PaginationProps = {
  total: number;
  limit: number;
  url: string;
  currentPage: number;
};

const Pagination: FC<PaginationProps> = ({
  total,
  limit,
  url,
  currentPage,
}) => {
  const pagesCount = Math.ceil(total / limit);
  const pages = range(1, pagesCount);

  return (
    <div className={style.container}>
      <ul className={style.list}>
        <li className={style["item-arrow"]}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
              stroke="#AFADB5"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </li>
        {pages.map((page) => (
          <PaginationItem
            key={page}
            page={page}
            url={`${url}?page=${page}`}
            currentPage={currentPage}
          />
        ))}
        <li className={style["item-arrow"]}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.8799 26.56L20.5732 17.8667C21.5999 16.84 21.5999 15.16 20.5732 14.1333L11.8799 5.44"
              stroke="#151411"
              strokeWidth="1.5"
              strokeMiterlimit="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
