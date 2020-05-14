import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from '../../hooks/useVisualMode';
import './styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';

const Appointment = ({ time, interview, interviewers}) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interview.interviewer}
        />
      )}
      {mode === CREATE && (
      <Form
      interviewers={interviewers}
      onCancel={() => back()}
      />
      )}
    </article>
  )
};

export default Appointment;
