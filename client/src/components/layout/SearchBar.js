import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { searchLogs, clearLogs } from '../../actions/logActions';
import { clearSearchTech } from '../../actions/techActions';

const SearchBar = ({ searchLogs, clearLogs, searchTech, clearSearchTech }) => {
  const searchInput = useRef(0);

  const [searchText, setSearchText] = useState('');
  const handleSearch = (event) => {
    setSearchText(event.target.value);
    if (event.target.value.trim() !== '') {
      searchLogs(event.target.value.trim());
    } else {
      clearLogs();
    }
    if (searchTech !== '' && searchTech !== event.target.value) {
      clearSearchTech();
    }
  };

  const handleSearchClose = () => {
    setSearchText('');
    clearLogs();
    if (searchTech !== '') {
      clearSearchTech();
    }
  };

  useEffect(() => {
    if (searchTech !== '') {
      setSearchText(searchTech);
      searchLogs(searchTech);
      searchInput.current.focus();
    }
    //eslint-disable-next-line
  }, [searchTech]);

  return (
    <nav className="rounded-top-corners" style={{background: '#019e9f'}}>
      <div className="nav-wrapper">
        <form>
          <div className="input-field">
            <input
              ref={searchInput}
              id="search"
              type="search"
              value={searchText}
              placeholder="Search logs..."
              onChange={handleSearch}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons" onClick={handleSearchClose}>
              close
            </i>
          </div>
        </form>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  searchTech: state.tech.searchTech,
});

export default connect(mapStateToProps, {
  searchLogs,
  clearLogs,
  clearSearchTech,
})(SearchBar);
