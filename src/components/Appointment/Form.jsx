import React, { useState } from 'react';
import InterviewerList from '../InterviewerList';
import Button from '../Button';

const Form = (props) => {
  const { name, interviewers, interviewer, onSave, onCancel } = props;
  const [studentName, setStudentName] = useState(name || "");
  const [interviewerId, setInterviewerId] = useState(interviewer || null);
  
  const reset = () => {
    setStudentName('');
    setInterviewerId(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name={name}
            type="text"
            placeholder="Enter Student Name"
            value={studentName}
            onChange={event => setStudentName(event.target.value)}
          />
        </form>
        <InterviewerList interviewers={interviewers} value={interviewerId} setInterviewer={setInterviewerId} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={() => onSave(studentName, interviewerId)} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}

export default Form
