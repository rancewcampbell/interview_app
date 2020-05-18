import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';

import Form from '../Appointment/Form';

afterEach(cleanup);

describe('Form', () => {
  const interviewers = [
    {
      id: 1,
      name: 'Sylvia Palmer',
      avatar: 'https://i.imgur.com/LpaY82x.png',
    },
  ];

  it('renders without student name if not provided', () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    expect(getByPlaceholderText('Enter Student Name')).toHaveValue('');
  });

  it('renders with initial student name', () => {
    const { getByTestId } = render(
      <Form interviewers={interviewers} name="Lydia Miller-Jones" />
    );
    expect(getByTestId('student-name-input')).toHaveValue('Lydia Miller-Jones');
  });

  it('validates that the student name is not blank', () => {
    const save = jest.fn();
    const { getByText } = render(
      <Form interviewers={interviewers} onSave={save} />
    );
    fireEvent.click(getByText('Save'));
    /* 1. validation is shown */
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();

    /* 2. onSave is not called */
    expect(save).not.toHaveBeenCalled();
  });

  it('calls onSave function when the name is defined', () => {
    const save = jest.fn();
    const { getByText, queryByText } = render(
      <Form
        interviewers={interviewers}
        onSave={save}
        name="Lydia Miller-Jones"
      />
    );

    fireEvent.click(getByText('Save'));
    /* 3. validation is not shown */
    expect(queryByText(/student name cannot be blank/i)).toBeNull();

    /* 4. onSave is called once*/
    expect(save).toHaveBeenCalledTimes(1);

    /* 5. onSave is called with the correct arguments */
    expect(save).toHaveBeenCalledWith('Lydia Miller-Jones', null);
  });
});
