import React, { FC } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

interface IProps {
  setOpen: (v: boolean) => void;
  open: boolean;
  categories: { name: string; _id: string }[];
}

const SideNav: FC<IProps> = ({ open, setOpen, categories }) => {
  const { category } = useParams<{ category: string }>();

  const l = useLocation();

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
        <li
          className={l.pathname === "/shop" ? "active" : ""}
          onClick={() => setOpen(!open)}
        >
          <NavLink className="sidenav-close" exact to="/shop">
            All
          </NavLink>
        </li>
        {categories &&
          categories.map(({ name, _id }) => {
            return (
              <li
                key={_id}
                className={category === name ? "active" : ""}
                onClick={() => setOpen(!open)}
              >
                <NavLink
                  style={{ textTransform: "capitalize" }}
                  className="sidenav-close"
                  to={`/products/${name}`}
                >
                  {name}
                  {/* {name.charAt(0).toUpperCase() + name.slice(1)} */}
                </NavLink>
              </li>
            );
          })}
      </span>
    </motion.ul>
  );
};

export default SideNav;
