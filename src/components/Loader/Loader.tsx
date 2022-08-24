import React from "react";

import classNames from "classnames";

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
  className = "loader-color",
}) => {
  let loaderClasses = classNames({
    "loader_size-s": size === "s" ? true : false,
    "loader_size-m": size === "m" ? true : false,
    "loader_size-l": size === "l" ? true : false,
  });

  loaderClasses = className ? loaderClasses + " " + className : "";

  return <>{loading && <div className={loaderClasses}>Loader</div>}</>;
};

export default Loader;
