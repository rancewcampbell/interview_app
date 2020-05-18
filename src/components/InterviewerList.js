import React from 'react';
import PropTypes from 'prop-types';
import InterviewerListItem from './InterviewerListItem';
import './InterviewerList.scss';

const InterviewerList = ({ value, interviewers, setInterviewer }) => {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers.map(interviewer => {
          return (
            <InterviewerListItem
              key={interviewer.id}
              name={interviewer.name}
              avatar={interviewer.avatar}
              selected={interviewer.id === value}
              setInterviewer={event => setInterviewer(interviewer.id)}
            />
          );
        })}
      </ul>
    </section>
  );
};

InterviewerList.propTypes = {
  value: PropTypes.number,
  setInterviewer: PropTypes.func.isRequired,
};

export default InterviewerList;
