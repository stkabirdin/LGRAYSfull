import React from 'react';
import { connect } from 'react-redux';
import { getTechs } from '../../actions/techActions';
import TechItem from './TechItem';

const TechListModal = ({ techs, getTechs }) => {
  return (
    <div id="tech-list-modal" className="modal">
      <div className="modal-content">
        <h4>Authorized Technicians</h4>
        <ul className="collection">
          {techs && techs.map((tech) => <TechItem key={tech._id} tech={tech} />)}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  techs: state.tech.techs,
});

export default connect(mapStateToProps, {getTechs})(TechListModal);
