import React, { useRef, useState, useEffect } from 'react';
import TechSelectOptions from '../techs/TechSelectOptions';
import M from 'materialize-css/dist/js/materialize.min';
import { connect } from 'react-redux';
import { updateLog } from '../../actions/logActions';

const EditLogModal = ({ current, updateLog }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  const editLogModal = useRef(0);

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    }
  }, [current]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (message === '') {
      M.toast({
        html: 'Log message cannot be empty',
        classes: 'red',
      });
    } else {
      updateLog({
        _id: current._id,
        message,
        attention,
        tech,
        date: (new Date()).toISOString(),
      });
      const modalInstance = M.Modal.getInstance(editLogModal.current);
      modalInstance.close();
      // Clear Fields
      setMessage('');
      setTech('');
      setAttention(false);
    }
  };

  return (
    <div
      ref={editLogModal}
      id="edit-log-modal"
      className="modal"
      style={modalStyle}
    >
      <div className="modal-content">
        <h4 style={{ marginBottom: '2rem' }}>Edit System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              placeholder={'Log message'}
              onChange={(e) => setMessage(e.target.value)}
            />
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
  height: '75%',
};

const mapStateToProps = (state) => ({
  current: state.log.current,
});

export default connect(mapStateToProps, { updateLog })(EditLogModal);
