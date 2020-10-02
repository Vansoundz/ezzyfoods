import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootReducer } from "../../store/reducers/root";
import { motion } from "framer-motion";

interface IProps {
  setOpen: (v: boolean) => void;
  open: boolean;
}

const SideNav: FC<IProps> = ({ open, setOpen }) => {
  const { categories } = useSelector((state: RootReducer) => ({
    categories: state.product.categories,
  }));

  return (
    <motion.ul
      initial={{
        x: `100vw`,
      }}
      animate={{
        x: 0,
      }}
      exit={{
        x: `100vw`,
      }}
      transition={{
        duration: 0.4,
        type: "tween",
      }}
      id="slide-out"
      className="sidenav"
    >
      <span>
        <li onClick={() => setOpen(!open)}>
          <NavLink className="sidenav-close" exact to="/">
            All
          </NavLink>
        </li>
        {categories &&
          categories.map((category, i) => {
            return (
              <li key={i} onClick={() => setOpen(!open)}>
                <NavLink className="sidenav-close" to={`/${category}`}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </NavLink>
              </li>
            );
          })}
      </span>
    </motion.ul>
  );
};

export default SideNav;
