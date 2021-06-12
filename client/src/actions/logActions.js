import {
  GET_LOGS,
  ADD_LOG,
  SET_LOADING,
  LOGS_ERROR,
  DELETE_LOG,
  SET_CURRENT,
  UPDATE_LOG,
  CLEAR_CURRENT,
  SEARCH_LOGS,
  CLEAR_LOGS,
} from './types';

import { v4 as uuidv4 } from 'uuid';
import M from 'materialize-css/dist/js/materialize.min';
import { defaultLogs } from '../defaults/defaultData';

export const setLoading = () => ({
  type: SET_LOADING,
});

// Get logs from server
export const getLogs = () => async (dispatch) => {
  setLoading();
  if (localStorage.token) {
    try {
      const res = await fetch('/api/logs', {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      const data = await res.json();
      if (data.error) {
        localStorage.removeItem('token');
        dispatch({
          type: GET_LOGS,
          payload: defaultLogs,
        });
      } else {
        dispatch({
          type: GET_LOGS,
          payload: data,
        });
      }
    } catch (err) {
      localStorage.removeItem('token');
      dispatch({
        type: GET_LOGS,
        payload: defaultLogs,
      });
    }
  } else {
    dispatch({
      type: GET_LOGS,
      payload: defaultLogs,
    });
  }
};

// Add new log
export const addLog = (logContent) => async (dispatch) => {
  try {
    setLoading();
    if (localStorage.token) {
      const res = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/JSON',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(logContent),
      });

      const data = await res.json();
      if (data.error) {
        localStorage.removeItem('token');
      } else {
        dispatch({
          type: ADD_LOG,
          payload: data,
        });
      }
    } else {
      dispatch({
        type: ADD_LOG,
        payload: { ...logContent, _id: uuidv4() },
      });
    }
    M.toast({ html: 'Log added!', classes: 'green' });
  } catch (err) {
    localStorage.removeItem('token');
    dispatch({
      type: LOGS_ERROR,
      payload: err,
    });
  }
};
// Delete
export const deleteLog = (id) => async (dispatch) => {
  try {
    setLoading();
    if (localStorage.token) {
      await fetch(`api/logs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/JSON',
          'x-auth-token': localStorage.getItem('token'),
        },
      });
    }
    dispatch({
      type: DELETE_LOG,
      payload: id,
    });
    M.toast({ html: 'Log deleted', classes: 'orange' });
  } catch (err) {
    M.toast({
      html: 'Oops! We encountered an error trying to delete this log.',
      classes: 'red',
    });
    dispatch({
      type: LOGS_ERROR,
      payload: err,
    });
  }
};
// Set current log
export const setCurrent = (log) => (dispatch) => {
  dispatch({
    type: SET_CURRENT,
    payload: log,
  });
};
// Clear current log
export const clearCurrent = () => (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT,
  });
};

// Update log
export const updateLog = (logContent) => async (dispatch) => {
  try {
    setLoading();
    if (localStorage.token) {
      const res = await fetch(`/api/logs/${logContent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/JSON',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(logContent),
      });

      const data = await res.json();
      dispatch({
        type: UPDATE_LOG,
        payload: data,
      });
    } else {
      dispatch({
        type: UPDATE_LOG,
        payload: logContent,
      });
    }
    M.toast({
      html: 'Log updated!',
      classes: 'green',
    });
  } catch (err) {
    localStorage.removeItem('token');
    M.toast({
      html: 'Oops! We encountered an error updating this log.',
      classes: 'red',
    });
    dispatch({
      type: LOGS_ERROR,
      payload: err,
    });
  }
};

// Search logs
export const searchLogs = (text) => (dispatch) => {
  dispatch({
    type: SEARCH_LOGS,
    payload: text,
  });
};

// Clear searched logs
export const clearLogs = () => (dispatch) => {
  dispatch({
    type: CLEAR_LOGS,
  });
};
