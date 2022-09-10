import { useSearchParams } from "react-router-dom";

import rootStore from "../instance";

export const useQueryParamsStoreInit = (): void => {
  const [search] = useSearchParams();

  rootStore.query.setSearch(search.toString());
};
