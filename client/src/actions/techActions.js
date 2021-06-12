import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  TECHS_ERROR,
  SET_SEARCH_TECH,
  CLEAR_SEARCH_TECH,
} from './types';

import { v4 as uuidv4 } from 'uuid';
import M from 'materialize-css/dist/js/materialize.min';
import { defaultTechs } from '../defaults/defaultData';

export const getTechs = () => async (dispatch) => {
  if (localStorage.token) {
    try {
      const res = await fetch('/api/techs', {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      const data = await res.json();

      dispatch({
        type: GET_TECHS,
        payload: data,
      });
    } catch (err) {
      dispatch({
        type: TECHS_ERROR,
        payload: err,
      });
    }
  } else {
    dispatch({
      type: GET_TECHS,
      payload: defaultTechs,
    });
  }
};
// Add new tech
export const addTech = (tech) => async (dispatch) => {
  try {
    if (localStorage.token) {
      const res = await fetch('/api/techs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/JSON',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(tech),
      });

      const data = await res.json();
      dispatch({
        type: ADD_TECH,
        payload: data,
      });
    } else {
      dispatch({
        type: ADD_TECH,
        payload: {...tech, _id: uuidv4()},
      });
    }
    M.toast({
      html: `Added ${tech.firstName} ${tech.lastName}`,
      classes: 'green',
    });
  } catch (err) {
    M.toast({
      html: 'Oops! We encountered an error adding this technician.',
      classes: 'red',
    });
    dispatch({
      type: TECHS_ERROR,
      payload: err,
    });
  }
};
// Delete
export const deleteTech = (tech) => async (dispatch) => {
  try {
    if (localStorage.token) {
      await fetch(`/api/techs/${tech._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/JSON',
          'x-auth-token': localStorage.getItem('token'),
        },
      });
    }
    dispatch({
      type: DELETE_TECH,
      payload: tech._id,
    });
    M.toast({
      html: `Removed ${tech.firstName} ${tech.lastName}`,
      classes: 'orange',
    });
  } catch (err) {
    M.toast({
      html: 'Oops! We encountered an error trying to remove the technician.',
      classes: 'red',
    });
    dispatch({
      type: TECHS_ERROR,
      payload: err,
    });
  }
};
// Set tech as search value
export const setSearchTech = (techName) => (dispatch) => {
  try {
    dispatch({
      type: SET_SEARCH_TECH,
      payload: techName,
    });
  } catch (err) {
    dispatch({
      type: TECHS_ERROR,
      payload: err,
    });
  }
};
// Clear tech search value
export const clearSearchTech = () => (dispatch) => {
  dispatch({
    type: CLEAR_SEARCH_TECH,
  });
};
