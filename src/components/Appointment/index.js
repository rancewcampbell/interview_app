import React, { useState, useEffect } from 'react';
import Confirm from './Confirm';
import Empty from './Empty';
import Error from './Error';
import Form from './Form';
import Header from './Header';
import Show from './Show';
import Status from './Status';
import useVisualMode from '../../hooks/useVisualMode';
import './styles.scss';

const CONFIRM = 'CONFIRM';
const CREATE = 'CREATE';
const DELETE = 'DELETE';
const EMPTY = 'EMPTY';
const ERROR = 'ERROR';
const SAVE = 'SAVE';
const SHOW = 'SHOW';

const Appointment = ({
  id,
  time,
  interview,
  interviewers,
  bookInterview,
  cancelInterview,
}) => {
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  const [message, setMessage] = useState('');
  let interviewer;

  if (interviewers) {
    interviewer = interviewers.find(
      el => interview && el.id === interview.interviewer
    );
  }

  // Handle save event
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVE);
    bookInterview(id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(() => {
        setMessage('Could not save');
        transition(ERROR, true);
      });
  };

  // Confirm message before delete
  const confirm = () => {
    setMessage('Are you sure you would like to delete?');
    transition(CONFIRM);
  };

  // Handle delete event
  const deleteInterview = () => {
    transition(DELETE, true);
    cancelInterview(id, interview)
      .then(() => {
        transition(EMPTY);
      })
      .catch(() => {
        setMessage('Could not delete');
        transition(ERROR, true);
      });
  };

  const edit = () => {
    transition(CREATE);
  };

  useEffect(() => {
    if (interview && mode === EMPTY) transition(SHOW);
    if (interview === null && mode === SHOW) transition(EMPTY);
  }, [mode, transition, interview]);

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={time} />
      {mode === ERROR && <Error onClose={back} message={message} />}
      {mode === SAVE && <Status message="Saving" />}
      {mode === DELETE && <Status message="Deleting" />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CONFIRM && (
        <Confirm
          message={message}
          onCancel={back}
          onConfirm={deleteInterview}
        />
      )}
      {mode === SHOW && interview && (
        <Show
          student={interview ? interview.student : ''}
          interviewer={interviewer ? interviewer.name : null}
          onDelete={confirm}
          onEdit={edit}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onCancel={back}
          onSave={save}
          name={interview ? interview.student : ''}
          interviewer={interview ? interview.interviewer : null}
        />
      )}
    </article>
  );
};

export default Appointment;
