import React, { useState, useEffect } from 'react';
import Header from './Header';
import Confirm from './Confirm';
import Empty from './Empty';
import Error from './Error';
import Form from './Form';
import Status from './Status';
import Show from './Show';
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

  const confirm = () => {
    setMessage('Are you sure you would like to delete?');
    transition(CONFIRM);
  };

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
    <article className="appointment">
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
