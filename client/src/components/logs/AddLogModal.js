import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min';
import TechSelectOptions from '../techs/TechSelectOptions';
import { addLog } from '../../actions/logActions';
import PropTypes from 'prop-types';

const AddLogModal = (props) => {
  const { addLog } = props;
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');
  const addLogModal = useRef(0);

  const onSubmit = (event) => {
    event.preventDefault();
    if (message === '') {
      M.toast({ html: 'Please enter a log message', classes: 'red' });
      return;
    }
    if (tech === '') {
      M.toast({ html: 'Please select a technician', classes: 'red' });
      return;
    }
    const modalInstance = M.Modal.getInstance(addLogModal.current);
    modalInstance.close();
    addLog({
      message,
      attention,
      tech,
      date: new Date().toISOString(),
    });
    setMessage('');
    setTech('');
    setAttention(false);
  };

  return (
    <div
      ref={addLogModal}
      id="add-log-modal"
      className="modal"
      style={modalStyle}
    >
      <div className="modal-content">
        <h4 style={{ marginBottom: '2rem' }}>Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <label htmlFor="message" className="active">
              Log Message
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              className="browser-default"
              onChange={(e) => setTech(e.target.value)}
            >
              <option value="" disabled>
                Select Technician
              </option>
              <TechSelectOptions />
            </select>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className="filled-in"
                  checked={attention}
                  value={attention}
                  onChange={() => {
                    setAttention(!attention);
                  }}
                />
                <span>Needs Attention</span>
              </label>
            </p>
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

const modalStyle = {
  width: '75%',
  height: 'auto',
};

AddLogModal.propTypes = {
  addLog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.log,
});

export default connect(mapStateToProps, { addLog })(AddLogModal);
