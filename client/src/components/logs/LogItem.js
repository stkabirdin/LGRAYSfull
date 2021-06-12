import React from 'react';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteLog, setCurrent } from '../../actions/logActions';
import { setSearchTech } from '../../actions/techActions';

const LogItem = ({ log, deleteLog, setCurrent, setSearchTech }) => {
  const onDelete = () => {
    deleteLog(log._id);
  };
  return (
    <li
      className="collection-item"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <span
          className={`${
            log.attention ? 'red-text' : 'blue-text'
          }`}
        >
          {log.message}
        </span>
        <br />
        <span className="grey-text">
          {'last updated by '}
          <span className="black-text clickable-label" onClick={() => setSearchTech(log.tech)}>{`${log.tech}`}</span>
          {log.date &&
            ` on ${format(parseISO(log.date), 'MM-dd-yyyy h:mm:ss a')}`}
        </span>
      </div>
      <div className="">
        <button
          type="button"
          className="button-icon-only modal-trigger"
          data-target="edit-log-modal"
          onClick={() => {
            setCurrent(log);
          }}
        >
          <i className="material-icons grey-text">edit</i>
        </button>
        <br />
        <button type="button" className="button-icon-only">
          <i className="material-icons grey-text" onClick={onDelete}>
            delete
          </i>
        </button>
      </div>
    </li>
  );
};

LogItem.propTypes = {
  log: PropTypes.object.isRequired,
  deleteLog: PropTypes.func.isRequired,
  setCurrent: PropTypes.func.isRequired,
};

export default connect(null, { deleteLog, setCurrent, setSearchTech })(LogItem);
