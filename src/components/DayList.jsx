import React from 'react';
import DayListItem from './DayListItem';

const DayList = (props) => {
  const { days, setDay } = props;
  return (
    <ul>
      {days.map((day) => {
        return (
          <DayListItem
            key={day.id}
            name={day.name}
            spots={day.spots}
            selected={day.name === props.day}
            setDay={event => setDay(day.name)}
          />
        )
      })}
    </ul>
  );
};

export default DayList;