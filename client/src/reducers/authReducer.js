import { REGISTER_USER, LOGIN_USER, AUTH_ERROR, LOAD_USER, LOGOUT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  name: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        isAuthenticated: true,
        name: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        name: action.payload,
      };
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        name: action.payload,
      };
    case AUTH_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        name: '',
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        name: '',
      };
    default:
      return state;
  }
};
