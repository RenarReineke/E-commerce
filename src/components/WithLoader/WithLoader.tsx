import React from "react";

import Loader from "@components/Loader";

export type WithLoaderProps = React.PropsWithChildren<{
  loading: boolean;
}>;

const WithLoader = ({ loading, children }: WithLoaderProps) => {
  return (
    <>
      {loading && <Loader />}
      {children}
    </>
  );
};

export default WithLoader;
