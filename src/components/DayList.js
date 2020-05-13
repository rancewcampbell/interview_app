import React from 'react';
import DayListItem from './DayListItem';

const DayList = ({ days, day, setDay }) => {
  return (
    <ul>
      {days.map((d) => {
        return (
          <DayListItem
            key={d.id}
            name={d.name}
            spots={d.spots}
            selected={d.name === day}
            setDay={event => setDay(d.name)}
          />
        )
      })}
    </ul>
  );
};

export default DayList;