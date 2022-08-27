import { FC } from "react";

import classNames from "classnames";
import { Link } from "react-router-dom";

import style from "./PaginationItem.module.scss";

type PaginationItemProps = {
  page: number;
  url: string;
  currentPage: number;
};

const PaginationItem: FC<PaginationItemProps> = ({
  page,
  url,
  currentPage,
}) => {
  const pageItem = classNames(`${style["page-item"]}`, {
    [`${style.active}`]: currentPage === page,
  });

  return (
    <Link className={pageItem} to={url}>
      <li className={pageItem}>{page}</li>
    </Link>
  );
};

export default PaginationItem;
