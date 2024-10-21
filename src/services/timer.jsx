import React, { createContext, useState } from 'react';
import { Timer } from 'easytimer.js';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timer] = useState(new Timer());
  const [displayTime, setDisplayTime] = useState('00:00');
  const [alarmTriggered, setAlarmTriggered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCheckboxTicked, setIsCheckboxTicked] = useState(false);
  const [lastView, setLastView] = useState('/Analog');
  const [pauseCountdown, setPauseCountdown] = useState(15);
  const [isInPause, setIsInPause] = useState(false); // Lägg till denna state

  const formatTime = (minutes, seconds) => {
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };


  const startPauseCountdown = (navigate) => {
    const pauseTimerInstance = new Timer();
    setIsInPause(true); // Markera att vi är i pausläge
  
    pauseTimerInstance.start({ countdown: true, startValues: { seconds: 15 } });
  
    pauseTimerInstance.addEventListener('secondsUpdated', () => {
      const timeValues = pauseTimerInstance.getTimeValues();
      setPauseCountdown(timeValues.seconds);
    });
  
    pauseTimerInstance.addEventListener('targetAchieved', () => {
      setPauseCountdown(15); // Återställ pausen
      setIsInPause(false); // Avmarkera pausläget
      resumeTimer(); // Återuppta huvudtimern
      navigate(lastView); // Navigera tillbaka till föregående vy (DigitalView/Analog)
    });
  };
  

  const pauseAndStartPauseCountdown = (navigate) => {
    pauseTimer(); // Pausa huvudtimern
    navigate('/Paus'); // Navigera till Paus-komponenten
    startPauseCountdown(navigate); // Starta 30-sekunders pausen
  };

  const startTimer = (minutes, navigate, currentView) => {
    if (timer.isRunning()) {
      timer.stop();
    }

    setIsPaused(false);
    setAlarmTriggered(false);
    setLastView(currentView);

    timer.removeEventListener('secondsUpdated');
    timer.removeEventListener('targetAchieved');

    timer.start({ countdown: true, startValues: { minutes } });

    timer.addEventListener('secondsUpdated', () => {
      const timeValues = timer.getTimeValues();
      setDisplayTime(formatTime(timeValues.minutes, timeValues.seconds));

      if (timeValues.seconds % 5 === 0 && isCheckboxTicked && !isInPause) {
        pauseAndStartPauseCountdown(navigate); // Varje 10:e sekund, starta en paus
      }
    });

    timer.addEventListener('targetAchieved', () => {
      setDisplayTime('00:00');
      setAlarmTriggered(true);
      navigate('/Alarm'); // Navigera till Alarm när tiden är 00:00
    });
  };

  const pauseTimer = () => {
    if (timer.isRunning()) {
      timer.pause();
      setIsPaused(true);
    }
  };

  const resumeTimer = () => {
    if (isPaused) {
      timer.start();
      setIsPaused(false);
    }
  };

  const resetTimer = () => {
    timer.stop();
    setDisplayTime('00:00');
    setAlarmTriggered(false);
    setIsPaused(false);
    setIsInPause(false); // Nollställ pausläget
  };

  return (
    <TimerContext.Provider value={{
      displayTime,
      startTimer,
      resetTimer,
      alarmTriggered,
      pauseTimer,
      resumeTimer,
      setIsCheckboxTicked,
      isCheckboxTicked,
      setLastView,
      lastView,
      pauseCountdown,
      isInPause, // Exponera isInPause
      setIsInPause, // Exponera setIsInPause så att den kan användas
    }}>
      {children}
    </TimerContext.Provider>
  );
};




