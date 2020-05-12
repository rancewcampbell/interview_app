import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import './InterviewerList.scss'

const InterviewerList = (props) => {
  const { interviewers, setInterviewer } = props;
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
            setInterviewer={event => setInterviewer(interviewer.id)}
            selected={interviewer.id === props.interviewer}
            />
          )
        })}
      </ul>
    </section>
  )
}

export default InterviewerList
