import React from 'react';
import useApplicationData from '../hooks/useApplicationData';
import Appointment from './Appointment/index';
import DayList from './DayList';
import {
  getAppointmentsForDay,
  getInterviewersForDay,
} from '../helpers/selectors';
import 'components/Application.scss';

const Application = () => {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  } = useApplicationData();
  const { day, days } = state;
  const appointments = getAppointmentsForDay(state, day);
  const interviewersForDay = getInterviewersForDay(state, day);

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
          <DayList days={days} day={day} setDay={setDay} />
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
            interviewers={interviewersForDay}
            bookInterview={bookInterview}
            cancelInterview={cancelInterview}
            {...appointment}
          />
        ))}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
};

export default Application;
