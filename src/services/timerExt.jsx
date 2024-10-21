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
  const [isInPause, setIsInPause] = useState(false);
  const [initialSeconds, setInitialSeconds] = useState(0); // Track initial total seconds

  const formatTime = (minutes, seconds) => {
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  const pauseAndStartPauseCountdown = (navigate) => {
    pauseTimer();
    setIsInPause(true); // Set to true when entering pause
    navigate('/Paus'); 
  };

  const startTimer = (minutes, navigate, currentView) => {
    if (timer.isRunning()) {
      timer.stop();
    }

    setIsPaused(false);
    setAlarmTriggered(false);
    setLastView(currentView);
    setIsInPause(false); // Reset pause state when starting a new timer
    setInitialSeconds(minutes * 60); // Store the total seconds when timer starts

    timer.removeEventListener('secondsUpdated');
    timer.removeEventListener('targetAchieved');

    timer.start({ countdown: true, startValues: { minutes } });

    timer.addEventListener('secondsUpdated', () => {
      const timeValues = timer.getTimeValues();
      setDisplayTime(formatTime(timeValues.minutes, timeValues.seconds));

      // Check if timer should pause after 10 seconds
      const remainingSeconds = timeValues.minutes * 60 + timeValues.seconds; // Convert to total seconds
      if (remainingSeconds <= initialSeconds - 10 && isCheckboxTicked && !isInPause) {
        pauseAndStartPauseCountdown(navigate);
      }
    });

    timer.addEventListener('targetAchieved', () => {
      setDisplayTime('00:00');
      setAlarmTriggered(true);
      navigate('/Alarm'); 
    });
  };

  const pauseTimer = () => {
    if (timer.isRunning()) {
      timer.pause();
      setIsPaused(true); // Update pause state
    }
  };

  const resumeTimer = () => {
    if (isPaused) {
      timer.start();
      setIsPaused(false);
      setIsInPause(false); // Reset the pause state when resuming
    }
  };

  const resetTimer = () => {
    timer.stop();
    setDisplayTime('00:00');
    setAlarmTriggered(false);
    setIsPaused(false);
    setIsInPause(false); 
    setInitialSeconds(0); // Reset initial seconds on reset
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
      isInPause,
    }}>
      {children}
    </TimerContext.Provider>
  );
};




