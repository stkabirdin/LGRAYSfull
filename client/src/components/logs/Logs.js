import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import SearchBar from '../layout/SearchBar';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';
import { getTechs } from '../../actions/techActions';
import { loadUser } from '../../actions/authActions';

const Logs = (props) => {
  const {
    log: { logs, loading, filteredLogs },
    getLogs,
    getTechs,
    auth: { isAuthenticated },
  } = props;

  useEffect( () => {
    getLogs();
    getTechs();
    // eslint-disable-next-line
  }, [isAuthenticated]);

  if (loading || logs === null) {
    return <Preloader />;
  }

  if (filteredLogs === null) {
    return (
      <>
        <SearchBar/>
        <ul className="collection">
        {!loading && logs.length === 0 ? (
          <p className="center">No logs to show</p>
        ) : (
          logs.map((log) => <LogItem log={log} key={log._id} />)
        )}
      </ul>
      </>
    );
  } else {
    return (
      <>
      <SearchBar/>
      <ul className="collection">
        {filteredLogs.length === 0 ? (
          <p className="center">No matches</p>
        ) : (
          filteredLogs.map((log) => <LogItem log={log} key={log._id} />)
        )}
      </ul>
      </>
    );
  }
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
  getLogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  log: state.log,
  auth: state.auth,
});

export default connect(mapStateToProps, { getLogs, getTechs, loadUser })(Logs);
