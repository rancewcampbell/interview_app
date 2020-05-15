import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status'
import useVisualMode from '../../hooks/useVisualMode';
import './styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVE = 'SAVE';

const Appointment = ({ id, time, interview, interviewers, bookInterview}) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  let interviewer;
  if (interviewers) {
    interviewer = interviewers.find(el => interview && el.id === interview.interviewer);
  } 
  
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE);
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      });
    
  };
  
  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === SAVE && <Status message="Saving" />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interviewer.name}
        />
      )}
      {mode === CREATE && (
      <Form
      interviewers={interviewers}
      onCancel={back}
      onSave={save}
      />
      )}
    </article>
  )
};

export default Appointment;
