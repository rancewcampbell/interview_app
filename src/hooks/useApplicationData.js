import { useEffect, useState } from 'react';
import axios from 'axios';
import updateSpots from '../helpers/updateSpots'


const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: []
  });
  const setDay = day => setState({...state, day});
  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    return (
      axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
        .then(() => {
          const days = updateSpots(state, appointments)
          setState(state => {return {...state, appointments, days}})
        })
    )
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots(state, appointments)
    return (
      axios.delete(`http://localhost:8001/api/appointments/${id}`)
        .then(() => {
          setState(state => {return {...state, appointments, days}})
        }) 
    )
  };

  useEffect(() => {
    const promise1 = axios.get('http://localhost:8001/api/days');
    const promise2 = axios.get('http://localhost:8001/api/appointments');
    const promise3 = axios.get('http://localhost:8001/api/interviewers');
    Promise.all([promise1, promise2, promise3])
      .then(all => {
        setState(state => (
          {...state,
            days: all[0].data,
            appointments: all[1].data,
            interviewers: all[2].data
          }))
      })
  }, []);
  return { bookInterview, setDay, cancelInterview, state }
};

export default useApplicationData;