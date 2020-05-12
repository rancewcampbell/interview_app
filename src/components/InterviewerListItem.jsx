import React from 'react';
import classNames from 'classnames';
import './InterviewerListItem.scss';

const InterviewerListItem = (props) => {
  const { name, avatar, selected, setInterviewer } = props;
  const interviewersClass = classNames({
    'interviewers__item': true,
    'interviewers__item--selected': selected, 
  });
  const interviewersImg = classNames({
    'interviewers__item-image': true,
    'interviewers__item-selected-image': selected
  });

  return (
    <li className={interviewersClass} onClick={setInterviewer}>
      <img
        className={interviewersImg}
        src={avatar}
        alt={name}
      />
      {selected? name : ''}
    </li>
  )
};

export default InterviewerListItem;
