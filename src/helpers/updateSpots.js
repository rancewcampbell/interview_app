const updateSpots = (state, appointments) => {
  const originalInterview = state.days.find(d => d.name === state.day);
  const index = state.days.indexOf(originalInterview);
  const spots = originalInterview.appointments.filter(
    el => !appointments[el].interview
  );
  const newInterview = { ...state.days[index], spots: spots.length };
  const days = [...state.days];
  days[index] = newInterview;
  return days;
};

export default updateSpots;
