import { useLocation } from "react-router-dom";

import rootStore from "../instance";

export const useQueryParamsStoreInit = (): void => {
  const { search } = useLocation();

  /* eslint-disable no-console */
  console.log("useQueryParamsStoreInit: ", search);

  rootStore.query.setSearch(search);
};
