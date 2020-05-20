import { useEffect, useReducer, useCallback } from 'react';
import axios from 'axios';
import updateSpots from '../helpers/updateSpots';
import reducer, {
  SET_INTERVIEW,
  SET_APPLICATION_DATA,
  SET_DAY,
} from '../reducers/application';

console.log(process.env);
let socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, {
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: [],
  });
  const setDay = day => dispatch({ type: SET_DAY, day });

  const updateInterview = useCallback(
    (id, interview = null) => {
      const appointment = {
        ...state.appointments[id],
        interview: interview ? { ...interview } : null,
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      const days = updateSpots(state, appointments);
      return { days, appointments };
    },
    [state]
  );

  const bookInterview = (id, interview) => {
    const { days, appointments } = updateInterview(id, interview);
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      dispatch({ type: SET_INTERVIEW, days, appointments });
    });
  };

  const cancelInterview = id => {
    const { days, appointments } = updateInterview(id);
    return axios.delete(`/api/appointments/${id}`).then(() => {
      dispatch({ type: SET_INTERVIEW, days, appointments });
    });
  };

  useEffect(() => {
    const promise1 = axios.get('/api/days');
    const promise2 = axios.get('/api/appointments');
    const promise3 = axios.get('/api/interviewers');
    Promise.all([promise1, promise2, promise3]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      });
    });
  }, []);

  useEffect(() => {
    socket.onmessage = message => {
      const { type, id, interview } = JSON.parse(message.data);
      if (type === SET_INTERVIEW) {
        const { days, appointments } = updateInterview(id, interview);
        dispatch({ type, days, appointments });
      }
    };
  }, [updateInterview]);

  useEffect(() => {
    if (socket.readyState > 1) {
      socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    }

    socket.onerror = event => {
      console.error('error:', event);
    };

    return () => {
      socket.close();
    };
  }, []);

  return { bookInterview, setDay, cancelInterview, state };
};

export default useApplicationData;
