import Routes from "@config/routes";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  /* eslint-disable no-console */
  console.log("routes: ", Routes);
  return (
    <BrowserRouter>
      <div>Hello ecomerce</div>
      <Routes />
    </BrowserRouter>
  );
};

export default App;
