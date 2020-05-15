const updateSpots = (state, appointments) => {
  const originalInterview = state.days.find(d => d.name === state.day);
  let spots = 5;
  for (const item of originalInterview.appointments) {
    if (appointments[item].interview) {
      spots -= 1
    }
  }
  const index = state.days.indexOf(originalInterview);
  const newInterview = {...state.days[index]}
  newInterview.spots = spots;
  const days = [...state.days,];
  days[index] = newInterview
  return days;
};

export default updateSpots;