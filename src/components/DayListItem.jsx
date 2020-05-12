import React from 'react';
import './DayListItem.scss';
import classNames from 'classnames';

const DayListItem = (props) => {
  const { name, spots, selected, setDay } = props;
  const dayClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': selected,
    'day-list__item--full': spots === 0
  });
  let message;
  if (spots === 0) {
    message = 'no spots remaining';
  } else if (spots === 1) {
    message = '1 spot remaining';
  } else {
    message = `${spots} spots remaining`;
  }
  return (
    <li className={dayClass} onClick={setDay}>
      <h2 className="text--regular">{ name }</h2> 
      <h3 className="text--light">{message}</h3>
    </li>
  );
};

export default DayListItem;