import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Appointment from './Appointment/index';
import DayList from './DayList';
import { getAppointmentsForDay } from '../helpers/selectors';
import 'components/Application.scss';

const Application= () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  const { day, days } = state;
  const setDay = day => setState({...state, day});
  const appointments = getAppointmentsForDay(state, day);

  useEffect(() => {
    const promise1 = axios.get('http://localhost:8001/api/days');
    const promise2 = axios.get('http://localhost:8001/api/appointments');
    const promise3 = axios.get('http://localhost:8001/api/interviewers');
    Promise.all([promise1, promise2, promise3])
      .then(all => {
        setState(prev => (
          {...prev,
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data
          }))
      })
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
};

export default Application;
