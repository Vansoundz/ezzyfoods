import { LOGIN, AUTH_ERROR, LOGOUT, SET_LOADING } from "./types";
import firebase from "../../firebase/init";
import { Dispatch } from "redux";

export const login = (email: string, password: string) => async (
  dispatch: Dispatch
) => {
  const { auth } = firebase;

  try {
    const res = await auth().signInWithEmailAndPassword(email, password);
    console.log(res);
    dispatch({
      type: LOGIN,
      payload: res.user,
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const logout = () => async (dispatch: Dispatch) => {
  const { auth } = firebase;
  try {
    await auth().signOut();
    dispatch({
      type: LOGOUT,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const setLoading = (v: boolean) => {
  return {
    type: SET_LOADING,
    payload: v,
  };
};
