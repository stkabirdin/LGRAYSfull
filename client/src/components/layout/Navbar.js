import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loadUser, logoutUser } from '../../actions/authActions';

const Navbar = ({ auth: { isAuthenticated, name }, loadUser, logoutUser }) => {
  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div id="navbar">
        <div />
        <span id="logo">Loggle</span>
        {!isAuthenticated ? (
          <ul id="navlinks">
            <li>
              <button
                data-target="login-modal"
                className="modal-trigger nav-button"
              >
                Login
              </button>
            </li>
            <li>
              <button
                data-target="register-modal"
                className="modal-trigger nav-button"
              >
                Register
              </button>
            </li>
          </ul>
        ) : (
          <div className="nav-welcome">
            <div className="nav-welcome-row">
            <span>{`Hello, ${name}`}</span>
            </div>
            <button type="button" className="nav-welcome-row logout-button" onClick={logoutUser}>
              <i className="material-icons logout-icon">exit_to_app</i>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { loadUser, logoutUser })(Navbar);
