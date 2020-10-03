import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SideNav from "./SideNav";
import { NavLink } from "react-router-dom";
import { RootReducer } from "../../store/reducers/root";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { getCategories } from "../../data/product.data";

const BottomNav = () => {
  // const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootReducer) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }));
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<{ name: string; _id: string }[]>(
    []
  );
  const { data } = useQuery("get categories", getCategories);

  useEffect(() => {
    if (data?.categories) {
      setCategories(data.categories);
    }
  }, [data]);

  return (
    <div>
      <AnimatePresence>
        {open && (
          <SideNav setOpen={setOpen} categories={categories} open={open} />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              type: "tween",
            }}
            className="sidenav-overlay"
            onClick={() => setOpen(!open)}
          ></motion.div>
        )}
      </AnimatePresence>

      <div className="bottom orange">
        {isAuthenticated && (
          <Fragment>
            <NavLink to="/dashboard">
              <i className="material-icons">dashboard</i>
            </NavLink>
          </Fragment>
        )}
        <NavLink to="/" exact>
          <i className="material-icons">home</i>
        </NavLink>
        <span onClick={() => setOpen(!open)}>
          <i data-target="slide-out" className="sidenav-trigger material-icons">
            menu
          </i>
        </span>
      </div>
    </div>
  );
};

export default BottomNav;
