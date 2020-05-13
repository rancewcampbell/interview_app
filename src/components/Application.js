import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Appointment from './Appointment/index';
import DayList from './DayList';
import 'components/Application.scss';

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Michael Fox",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  },
  {
    id: 5,
    time: "3pm"
  },
  {
    id: 4,
    time: "4pm",
    interview: {
      student: "Robin Williams",
      interviewer: { 
        id: 5, 
        name: "Sven Jones", 
        avatar: "https://i.imgur.com/twYrpay.jpg" }
    }
  }

];
const Application= () => {
  const [days, setDays] = useState([]);
  const [day, setDay] = useState('Monday');

  useEffect(() => {
    axios.get('http://localhost:8001/api/days')
      .then((res) => {
        setDays(res.data);
      });
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList 
          days={days}
          day={day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {appointments.map(appointment => (
          <Appointment 
          key={appointment.id} 
          {...appointment}
          />))}
          <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
export default Application;
