import CartIcon from "@components/CartIcon";
import LogoIcon from "@components/LogoIcon";
import UserIcon from "@components/UserIcon";
import { NavLink } from "react-router-dom";

import style from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <nav className={style.container}>
      <div className={style.logo}>
        <NavLink to="/">
          <span className={style["logo-icon"]}>
            <LogoIcon />
          </span>
          Lalasia
        </NavLink>
      </div>

      <div className={style.wrapper}>
        <ul className={style.list}>
          <li className={style.item}>
            <NavLink to="/">Product</NavLink>
          </li>
          <li className={style.item}>
            <NavLink to="/">Services</NavLink>
          </li>
          <li className={style.item}>
            <NavLink to="/">Article</NavLink>
          </li>
          <li className={style.item}>
            <NavLink to="/">About us</NavLink>
          </li>
        </ul>
        <div className={style.profile}>
          <NavLink to="/">
            <span className={style.cart}>
              <CartIcon />
            </span>
          </NavLink>
          <NavLink to="/">
            <span className={style.user}>
              <UserIcon />
            </span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
