import React, { useRef, useState } from 'react';
import M from 'materialize-css/dist/js/materialize.min';
import { connect } from 'react-redux';
import { addTech } from '../../actions/techActions';

const AddTechModal = ({ addTech }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const addTechModal = useRef(0);

  const onSubmit = (event) => {
    event.preventDefault();
    if (firstName === '' || lastName === '') {
      M.toast({ html: 'Please enter full name of technician', classes: 'red' });
    } else {
      addTech({ firstName, lastName });
      const modalInstance = M.Modal.getInstance(addTechModal.current);
      modalInstance.close();
      setFirstName('');
      setLastName('');
    }
  };

  return (
    <div ref={addTechModal} id="add-tech-modal" className="modal">
      <div className="modal-content">
        <h4 style={{ marginBottom: '2rem' }}>Add Technician</h4>
        <div className="row">
          <div className="input-field col s6">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="firstName" className="active">
              First Name
            </label>
          </div>
          <div className="input-field col s6">
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="lastName" className="active">
              Last Name
            </label>
          </div>
        </div>
      </div>
      <div className="modal-footer">
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
          Enter
        </button>
      </div>
    </div>
  );
};

export default connect(null, { addTech })(AddTechModal);
