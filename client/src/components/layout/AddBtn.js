import React from 'react';

const AddBtn = () => {
  return (
    <div className="fixed-action-btn">
      <button
        type="button"
        className="btn-floating background-primary-light btn-large"
      >
        <i className="large material-icons" style={{fontSize: '2rem'}}>expand_less</i>
      </button>
      <ul>
        <li>
          <button
            type="button"
            data-target="tech-list-modal"
            className="btn-floating green modal-trigger"
          >
            <i className="material-icons">people</i>
          </button>
        </li>
        <li>
          <button
            type="button"
            data-target="add-tech-modal"
            className="btn-floating orange modal-trigger"
          >
            <i className="material-icons">person_add</i>
          </button>
        </li>

        <li>
          <button
            type="button"
            data-target="add-log-modal"
            className="btn-floating blue modal-trigger"
          >
            <i className="material-icons">post_add</i>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AddBtn;
