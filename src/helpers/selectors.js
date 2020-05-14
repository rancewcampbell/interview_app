export function getAppointmentsForDay(state, day) {
  const appointmentData = state.days.find(d => d.name === day);
  const appointments = [];
  if (!appointmentData || !state.days.length) return [];
  for (const id of appointmentData.appointments) {
    if (state.appointments[id]) appointments.push(state.appointments[id])
  }
  return appointments;
};

export function getInterview(state, interview) {
  if (!interview) return null;
  const { student, interviewer } = interview;
  const interviewData = {
    interviewer: state.interviewers[interviewer],
    student
  };
  return interviewData;
};