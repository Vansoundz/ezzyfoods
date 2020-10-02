import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "./SideNav";
import { NavLink } from "react-router-dom";
import { loadCategories } from "../../store/actions/product";
import { RootReducer } from "../../store/reducers/root";
import { AnimatePresence, motion } from "framer-motion";

const BottomNav = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootReducer) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  return (
    <div>
      <AnimatePresence>
        {open && <SideNav setOpen={setOpen} open={open} />}
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
