import React from 'react';

import {
  render,
  cleanup,
  waitForElement,
  fireEvent,
  getByText,
  getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText,
  prettyDOM,
} from '@testing-library/react';

import Application from 'components/Application';

afterEach(cleanup);

describe('Appointment', () => {
  it('defaults to Monday and changes the schedule when a new day is selected', async () => {
    const { getByText, queryByText } = render(<Application />);
    await waitForElement(() => getByText('Monday'));
    fireEvent.click(getByText('Tuesday'));
    expect(getByText('Leopold Silvers')).toBeInTheDocument();
    expect(queryByText('Archie Cohen')).toBeNull();
  });

  it('loads data, books an interview and reduces the spots remaining for the first day by 1', async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment')[0];
    fireEvent.click(getByAltText(appointment, 'Add'));
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: 'Lydia Miller-Jones' },
    });
    fireEvent.click(getByAltText(appointment, 'Sylvia Palmer'));
    fireEvent.click(getByText(appointment, 'Save'));
    expect(getByText(appointment, 'Saving')).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, 'Lydia Miller-Jones'));
    const days = getAllByTestId(container, 'day');
    const day = days.find(el => queryByText(el, 'Monday'));
    expect(getByText(day, /no spots remaining/i));
  });

  it('loads data, cancels an interview and increases the spots remaining for Monday by 1', async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, 'Archie Cohen'));
    const appointment = getAllByTestId(container, 'appointment')[1];
    fireEvent.click(queryByAltText(appointment, 'Delete'));
    expect(
      getByText(appointment, 'Are you sure you would like to delete?')
    ).toBeInTheDocument();
    fireEvent.click(queryByText(appointment, 'Confirm'));
    expect(getByText(appointment, 'Deleting')).toBeInTheDocument();
    await waitForElement(() => getByAltText(appointment, 'Add'));
    const days = getAllByTestId(container, 'day');
    const day = days.find(el => queryByText(el, 'Monday'));
    expect(getByText(day, '2 spots remaining'));
  });
});
