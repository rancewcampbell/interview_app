import React, { useState } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

const Form = ({ name, interviewers, interviewer, onSave, onCancel }) => {
  const [studentName, setStudentName] = useState(name || '');
  const [interviewerId, setInterviewerId] = useState(interviewer || null);

  const reset = () => {
    setStudentName('');
    setInterviewerId(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  const save = () => onSave(studentName, interviewerId);

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder={name || 'Enter Student Name'}
            value={studentName}
            onChange={event => setStudentName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <InterviewerList
          interviewers={interviewers}
          value={interviewerId}
          setInterviewer={setInterviewerId}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>
            Cancel
          </Button>
          <Button onClick={save} confirm>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
};

export default Form;
