import { REGISTER_USER, LOGIN_USER, LOAD_USER, LOGOUT_USER } from './types';
import M from 'materialize-css/dist/js/materialize.min';

export const registerUser = (formContent) => async (dispatch) => {
  try {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON',
      },
      body: JSON.stringify(formContent),
    });
    const data = await res.json();
    localStorage.setItem('token', data.token);
    dispatch({
      type: REGISTER_USER,
      payload: formContent.name,
    });
    M.toast({
      html: 'Success! Welcome to Loggle.',
      classes: 'green',
    });
  } catch (err) {
    M.toast({
      html: `Oops! We've encountered an error trying to register you.`,
      classes: 'red',
    });
  }
};

export const loginUser = (formContent) => async (dispatch) => {
  try {
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/JSON',
      },
      body: JSON.stringify(formContent),
    });
    const data = await res.json();
    if (data.error) {
      return false;
    }
    localStorage.setItem('token', data.token);
    dispatch({
      type: LOGIN_USER,
      payload: formContent.name,
    });
    M.toast({
      html: `Login success! Welcome back.`,
      classes: 'green',
    });
    return true;
  } catch (err) {
    M.toast({
      html: `Oops! We've encountered a server error trying to log you in.`,
      classes: 'red',
    });
    return false;
  }
};
export const loadUser = (formContent) => async (dispatch) => {
  if (localStorage.token) {
    try {
      const res = await fetch('/api/auth', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/JSON',
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      const user = await res.json();
      if (user.error) {
        localStorage.removeItem('token');
      } else {
        dispatch({
          type: LOAD_USER,
          payload: user.name,
        });
      };
    } catch (err) {
      localStorage.removeItem('token');
    }
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({
    type: LOGOUT_USER,
  });
  M.toast({
    html: 'Logged out!',
    classes: 'orange',
  });
};