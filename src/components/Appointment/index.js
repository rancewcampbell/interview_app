import React from 'react';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from '../../hooks/useVisualMode';
import './styles.scss';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVE = 'SAVE';
const DELETE = 'DELETE';
const CONFIRM = 'CONFIRM';

const Appointment = ({ id, time, interview, interviewers, bookInterview, cancelInterview}) => {
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

  const confirm = () => {
    transition(CONFIRM)
  };

  const deleteInterview = () => {
    transition(DELETE)
    cancelInterview(id, interview)
      .then(() => {
        transition(EMPTY)
      })
  };
  
  return (
    <article className="appointment">
      <Header time={time}/>
      {mode === SAVE && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CONFIRM && 
        <Confirm
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={deleteInterview}
        />}
      {mode === SHOW && (
        <Show
          student={interview.student}
          interviewer={interviewer.name}
          onDelete={confirm}
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
