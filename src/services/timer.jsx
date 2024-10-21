import React, { createContext, useState } from 'react';
import { Timer } from 'easytimer.js';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timer] = useState(new Timer());
  const [displayTime, setDisplayTime] = useState('00:00');
  const [lastView, setLastView] = useState('/Analog');
  const [alarmTriggered, setAlarmTriggered] = useState(false);
  const [isCheckboxTicked, setIsCheckboxTicked] = useState(false);

  const formatTime = (minutes, seconds) => {
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const startTimer = (timerValue, navigate) => {
    if (timer.isRunning()) {
      timer.stop();
    }
    setAlarmTriggered(false);

    const totalSeconds = timerValue * 60;

    timer.start({
      countdown: true,
      startValues: { seconds: totalSeconds },

    });

    timer.addEventListener('secondsUpdated', () => {
      const timeValues = timer.getTimeValues();
      setDisplayTime(formatTime(timeValues.minutes, timeValues.seconds));
    });

    timer.addEventListener('targetAchieved', handleTargetAchieved(navigate));
  };

  const handleTargetAchieved = (navigate) => () => {
    if (isCheckboxTicked) {
      timer.pause(); // Pausa timern
      console.log("Timer paused after 10 seconds");
      navigate('/Paus'); // Navigera till pausvy
    } else {
      console.log("Timer continues running without pause.");
      const currentTime = timer.getTimeValues().totalSeconds; // Hämta nuvarande tid i sekunder
      timer.start({
        countdown: true,
        startValues: { seconds: currentTime },
        target: { seconds: currentTime - 10 }
      });
    }
  };

  const resetTimer = () => {
    timer.stop();
    setDisplayTime('00:00');
    setAlarmTriggered(false);
  };

  return (
    <TimerContext.Provider value={{
      startTimer,
      displayTime,
      resetTimer,
      setLastView,
      lastView,
      alarmTriggered,
      setIsCheckboxTicked,
      isCheckboxTicked,
    }}>
      {children}
    </TimerContext.Provider>
  );
};






