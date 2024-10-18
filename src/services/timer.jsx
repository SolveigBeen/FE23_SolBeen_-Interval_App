// TimerContext.js
import React, { createContext, useState } from 'react';
import { Timer } from 'easytimer.js';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timer] = useState(new Timer());
  const [displayTime, setDisplayTime] = useState('00:00');

  const startTimer = (minutes) => {
    timer.start({ countdown: true, startValues: { minutes } });

    timer.addEventListener('secondsUpdated', () => {
      const timeValues = timer.getTimeValues();
      setDisplayTime(timeValues.toString());
    });

    timer.addEventListener('targetAchieved', () => {
      setDisplayTime('00:00');
    });
  };

  const abortTimer = () => {
    timer.stop();
    setDisplayTime('00:00');
  };

  return (
    <TimerContext.Provider value={{ displayTime, startTimer, abortTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

