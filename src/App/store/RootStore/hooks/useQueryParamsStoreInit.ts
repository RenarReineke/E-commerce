import { useLocation, useSearchParams } from "react-router-dom";

import rootStore from "../instance";

export const useQueryParamsStoreInit = (): void => {
  const [search] = useSearchParams();
  const location = useLocation();

  rootStore.query.setSearch(search.toString());
  rootStore.query.setPath(location.pathname);

  /* eslint-disable no-console */
  console.log("HOOK: ", search.toString());
};
