import React from 'react';
import { connect } from 'react-redux';

const TechSelectOptions = ({ techs }) => ((techs && techs.length > 0) ? (techs.map((tech) => (
  <option key={tech._id} value={`${tech.firstName} ${tech.lastName}`}>
    {`${tech.firstName} ${tech.lastName}`}
  </option>
))) : (<option value="Default technician">Default technician</option> ));

const mapStateToProps = (state) => ({
  techs: state.tech.techs,
});

export default connect(mapStateToProps)(TechSelectOptions);
