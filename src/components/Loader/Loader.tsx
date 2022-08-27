import React from "react";

import classNames from "classnames";

import style from "./Loading.module.scss";

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
  size = LoaderSize.m,
  className = "",
}) => {
  let loaderClasses = classNames("style.loader", `style.loader_size-${size}`);

  loaderClasses = className ? loaderClasses + " " + className : "";

  return <>{loading && <div className={loaderClasses}>Loader</div>}</>;
};

export default Loader;
