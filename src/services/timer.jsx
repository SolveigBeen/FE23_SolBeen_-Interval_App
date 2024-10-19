// TimerContext.js
import React, { createContext, useState } from 'react';
import { Timer } from 'easytimer.js';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timer] = useState(new Timer());
  const [displayTime, setDisplayTime] = useState('00:00');
  const [alarmTriggered, setAlarmTriggered] = useState(false);

  const formatTime = (minutes, seconds) => {
    const formattedMinutes = String(minutes).padStart(2, '0'); // Pad med nollor till två siffror
    const formattedSeconds = String(seconds).padStart(2, '0'); // Pad med nollor till två siffror
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const startTimer = (minutes) => {

    if (timer.isRunning()) {
      timer.stop();
    }

    // Rensa event listeners
    timer.removeEventListener('secondsUpdated');
    timer.removeEventListener('targetAchieved');

    // Återställ alarmTriggered till false vid start av ny timer
    setAlarmTriggered(false);
    timer.start({ countdown: true, startValues: { minutes } });

    timer.addEventListener('secondsUpdated', () => {
      const timeValues = timer.getTimeValues();
      setDisplayTime(formatTime(timeValues.minutes, timeValues.seconds));
    });

    timer.addEventListener('targetAchieved', () => {
      setDisplayTime('00:00');
      setAlarmTriggered(true);
    });
  };

  const abortTimer = () => {
    timer.stop();
    setDisplayTime('00:00');
    setAlarmTriggered(false); 
  };

    // Funktion för att återställa timern
    const resetTimer = () => {
      timer.stop();
      timer.removeEventListener('secondsUpdated');
      timer.removeEventListener('targetAchieved');
      setDisplayTime('00:00');
      setAlarmTriggered(false); // Återställ flaggan när timern återställs
    };

  return (
    <TimerContext.Provider value={{ displayTime, startTimer, abortTimer, resetTimer, alarmTriggered }}>
      {children}
    </TimerContext.Provider>
  );
};

