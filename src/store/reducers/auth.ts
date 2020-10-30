import { User } from "firebase";
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  LOGIN,
  SET_LOADING,
} from "../actions/types";
import { authAction } from "../actions/types.actions";

interface IAState {
  user?: User;
  isAuthenticated: boolean;
  loading: boolean;
}

const initState: IAState = {
  user: undefined,
  isAuthenticated: false,
  loading: false,
};

const auth = (state = initState, action: authAction) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
    case USER_LOADED:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: payload,
      };
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
};

export default auth;
