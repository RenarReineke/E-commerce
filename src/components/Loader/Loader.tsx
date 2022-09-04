import React from "react";

import classNames from "classnames";

import style from "./Loader.module.scss";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = LoaderSize.l,
  className = "",
}) => {
  let loaderClasses = classNames(
    `${style.loader}`,
    `${style[`loader_size-${size}`]}`,
    className ? `${style[className]}` : false
  );

  return <>{loading && <div className={loaderClasses}></div>}</>;
};

export default Loader;
