import React, { useRef, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

const LoginModal = ({ loginUser }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const loginModal = useRef(0);

  const onCancel = () => {
    setName('');
    setPassword('');
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (name === '' || password === '') {
      M.toast({ html: 'Please fill out all fields', classes: 'red' });
    } else {
      const loginSuccess = loginUser({ name, password });
      loginSuccess.then((success) => {
        if (success) {
          setName('');
          setPassword('');
          const modalInstance = M.Modal.getInstance(loginModal.current);
          modalInstance.close();
        } else {
          M.toast({
            html: "Invalid credentials",
            classes: 'red',
          });
        }
      });
    }
  };

  return (
    <div ref={loginModal} id="login-modal" className="modal">
      <div className="modal-content">
        <h4 className = "background-primary-light rounded-top-corners" style={{ textAlign: "center", color: "white", padding: "0.3rem 0.5rem" ,marginBottom: '2rem', fontFamily: 'Exo, sans-serif' }}>Login</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name" className="active">
              Username
            </label>
          </div>
          <div className="row">
            <div className="input-field">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password" className="active">
                Password
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer center">
        <button
          type="button"
          onClick={onCancel}
          className="btn-flat grey lighten-2 waves-effect modal-close hover-effect"
          style={{ marginRight: '0.8rem' }}
        >
          Cancel
        </button>
        <button
          type="submit"
          onClick={onSubmit}
          className="waves-effect btn background-primary-light hover-effect"
          style={{ marginRight: '1rem' }}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default connect(null, { loginUser })(LoginModal);
