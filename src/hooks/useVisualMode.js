import { useState } from 'react';


const useVisualMode = (initialMode) => {
  const [ history, setHistory ] = useState([initialMode]);

  const transition = (newMode, replace = false) => {
    if (replace) {
      setHistory(([_, ...history]) => [newMode, ...history])
    } else {
      setHistory(history => [newMode, ...history]);
    }
  };

  const back = () => {
    if (history.length > 1) setHistory(([_, ...history]) => history)
  }
  return { transition , mode: history[0], back }
};

export default useVisualMode;