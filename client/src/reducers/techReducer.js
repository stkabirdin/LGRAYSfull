import {
  ADD_TECH,
  DELETE_TECH,
  GET_TECHS,
  TECHS_ERROR,
  SET_SEARCH_TECH,
  CLEAR_SEARCH_TECH,
} from '../actions/types';

const initialState = {
  techs: null,
  error: null,
  searchTech: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TECHS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_TECHS:
      return {
        ...state,
        techs: action.payload,
      };
    case ADD_TECH:
      return {
        ...state,
        techs: [...state.techs, action.payload],
      };
    case DELETE_TECH:
      return {
        ...state,
        techs: state.techs.filter((tech) => tech._id !== action.payload),
      };
    case SET_SEARCH_TECH:
      return {
        ...state,
        searchTech: action.payload,
      };
    case CLEAR_SEARCH_TECH:
      return {
        ...state,
        searchTech: '',
      };

    default:
      return state;
  }
};
