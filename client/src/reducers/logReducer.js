import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS,
  CLEAR_LOGS,
} from '../actions/types';

const initialState = {
  logs: null,
  current: null,
  loading: false,
  error: null,
  filteredLogs: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LOGS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case GET_LOGS:
      return {
        ...state,
        logs: action.payload,
        loading: false,
      };
    case ADD_LOG:
      return {
        ...state,
        logs: [action.payload, ...state.logs],
        loading: false,
      };
    case DELETE_LOG:
      return {
        ...state,
        logs: state.logs.filter((log) => log._id !== action.payload),
        filteredLogs: state.filteredLogs
          ? state.filteredLogs.filter((log) => log._id !== action.payload)
          : null,
        loading: false,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case UPDATE_LOG:
      return {
        ...state,
        logs: state.logs.map((log) => {
          if (log._id === action.payload._id) {
            return action.payload;
          }
          return log;
        }),
        filteredLogs: state.filteredLogs
          ? state.filteredLogs.map((log) => {
              if (log._id === action.payload._id) {
                return action.payload;
              }
              return log;
            })
          : null,
      };
    case SEARCH_LOGS:
      // Escapes special characters from search
      const escapeRegExp = (string) => {
        return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
      };

      return {
        ...state,
        filteredLogs: state.logs.filter((log) => {
          const regex = new RegExp(escapeRegExp(action.payload), 'gi');
          return log.message.match(regex) || log.tech.match(regex);
        }),
      };
    case CLEAR_LOGS:
      return {
        ...state,
        filteredLogs: null,
      };
    default:
      return state;
  }
};
