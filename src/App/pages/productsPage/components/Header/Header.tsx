import Navbar from "./components/Navbar";
import Search from "./components/Search";
import style from "./Header.module.scss";

const Header = () => {
  return (
    <div className={style.header}>
      <Navbar />
      <h1 className={style.title}>Products</h1>
      <p className={style.subtitle}>
        We display products based on the latest products we have, if you want to
        see our old products please enter the name of the item
      </p>
      <Search />
    </div>
  );
};

export default Header;
