import Routes from "@config/routes";
import { useQueryParamsStoreInit } from "@store/RootStore/hooks/useQueryParamsStoreInit";

const App = () => {
  useQueryParamsStoreInit();
  return <Routes />;
};

export default App;
