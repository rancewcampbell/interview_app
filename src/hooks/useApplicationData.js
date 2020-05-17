import { useEffect, useReducer, useCallback } from 'react';
import axios from 'axios';
import updateSpots from '../helpers/updateSpots';

const SET_DAY = 'SET_DAY';
const SET_APPLICATION_DATA = 'SET_APPLICATION_DATA';
const SET_INTERVIEW = 'SET_INTERVIEW';

let socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

const reducer = (state, action) => {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers,
      };
    case SET_INTERVIEW: {
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
      };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};

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
    return axios
      .put(`http://localhost:8001/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, days, appointments });
      });
  };

  const cancelInterview = id => {
    const { days, appointments } = updateInterview(id);
    return axios
      .delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, days, appointments });
      });
  };

  useEffect(() => {
    const promise1 = axios.get('http://localhost:8001/api/days');
    const promise2 = axios.get('http://localhost:8001/api/appointments');
    const promise3 = axios.get('http://localhost:8001/api/interviewers');
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
