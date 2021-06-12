import React, { useRef, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

const RegisterModal = ({ registerUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const registerModal = useRef(0);

  const onSubmit = (event) => {
    event.preventDefault();
    if (name === '' || email === '' || password === '' || password2 === '') {
      M.toast({ html: 'Please fill out all fields', classes: 'red' });
      return;
    }
    if (password !== password2) {
      M.toast({ html: 'Passwords do not match', classes: 'red' });
      return;
    }
    if (password.length < 6) {
      M.toast({ html: 'Password must be at least 6 characters', classes: 'red' });
      return;
    }
    // Client-side regex email validation to check for typos
    // eslint-disable-next-line no-control-regex
    const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const re = new RegExp(emailPattern,'g');
    const emailRegExpMatchArray = email.match(re);
    if (!emailRegExpMatchArray || (emailRegExpMatchArray[0] !== email)) {
      M.toast({ html: 'Please enter a valid email address', classes: 'red' });
      return;
    }
    registerUser({ name, email, password });
    const modalInstance = M.Modal.getInstance(registerModal.current);
    modalInstance.close();
  };

  return (
    <div ref={registerModal} id="register-modal" className="modal">
      <div className="modal-content">
        <h4 className = "background-primary-light rounded-top-corners" style={{ textAlign: "center", color: "white", padding: "0.3rem 0.5rem" ,marginBottom: '0.5rem', fontFamily: 'Exo, sans-serif' }}>Register Tech Team</h4>
        <div className="row" style={{marginBottom: '0'}}>
          <div className="input-field col s6">
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
          <div className="input-field col s6">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="email" className="active">
              Email
            </label>
          </div>
        </div>
        <div className="row" style={{marginTop: '0'}}>
          <div className="input-field col s12">
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
          <div className="input-field col s12">
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <label htmlFor="password2" className="active">
              Confirm Password
            </label>
          </div>
        </div>
      </div>
      <div className="modal-footer center">
        <button
          type="button"
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
          Submit
        </button>
      </div>
    </div>
  );
};

export default connect(null, { registerUser })(RegisterModal);
