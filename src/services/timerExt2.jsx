import React, { createContext, useState } from 'react';
import { Timer } from 'easytimer.js';

export const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timer] = useState(new Timer());
  const [displayTime, setDisplayTime] = useState('00:00');
  const [lastView, setLastView] = useState('/Analog');
  const [alarmTriggered, setAlarmTriggered] = useState(false);
  const [isCheckboxTicked, setIsCheckboxTicked] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
 

  const getTimeValues = () => {
    const timeValues = timer.getTimeValues();
    return {
      minutes: timeValues.minutes,
      seconds: timeValues.seconds,
    };
  };


  

  const startTimer = (timerValue, navigate) => {
    if (timer.isRunning()) {
      timer.stop();
    }
    setAlarmTriggered(false);

    const calculatedTotalSeconds = timerValue * 60;
    

      // Rensa tidigare event-lyssnare för att undvika duplicering
    timer.removeEventListener('secondsUpdated');
    timer.removeEventListener('targetAchieved');

    // Kontrollera om checkboxen är markerad eller inte
    if (isCheckboxTicked) {
      // När checkboxen är markerad, sätt ett mål för 10 sekunder mindre
      timer.start({
        countdown: true,
        startValues: { seconds: calculatedTotalSeconds },
        target: { seconds: calculatedTotalSeconds - 5 }
      });

      timer.addEventListener('secondsUpdated', () => {
        const { minutes, seconds } = getTimeValues();
        setDisplayTime(formatTime(minutes, seconds));
      });

      timer.addEventListener('targetAchieved', handleTargetAchieved(navigate));
    } else {
      // När checkboxen inte är markerad, kör timern utan mål
      timer.start({
        countdown: true,
        startValues: { seconds: calculatedTotalSeconds }
      });

      timer.addEventListener('secondsUpdated', () => {
        const { minutes, seconds } = getTimeValues();
        setDisplayTime(formatTime(minutes, seconds));
      });

      timer.addEventListener('targetAchieved', handleTargetAchieved(navigate));
    }
  };

  const handleTargetAchieved = (navigate) => () => {
    if (isCheckboxTicked) {
      // Pausar timern när checkboxen är markerad och 10 sekunder har gått
      timer.pause();
      console.log("Timer paused after 10 seconds");
      navigate('/Paus'); // Navigera till pausvy
      setIsPaused(true);
    } else {
      // Navigera till Alarm när checkboxen inte är markerad
      console.log("Timer reached the target, navigating to Alarm.");
      navigate('/Alarm');
    }
  };

  const resumeTimer = (navigate) => {
    if (isPaused) {
      const currentTime = timer.getTimeValues().totalSeconds; // Hämta nuvarande tid i sekunder
      const newTargetTime = currentTime - 5; // Ställ in en ny paus om 5 sekunder
  
      // Rensa event-lyssnare för att undvika duplicering
      timer.removeEventListener('secondsUpdated');
      timer.removeEventListener('targetAchieved');
      setIsPaused(false);
  
      // Återuppta timern och sätt en ny target för 5 sekunder
      timer.start({
        countdown: true,
        startValues: { seconds: currentTime },
        target: { seconds: newTargetTime }
      });
  

      // Lägg tillbaka event listeners efter att timern har startats om
      timer.addEventListener('secondsUpdated', () => {
        const { minutes, seconds } = getTimeValues();
    setDisplayTime(formatTime(minutes, seconds));
      });
  
      timer.addEventListener('targetAchieved', handleTargetAchieved(navigate));
    }
  };
  

  const resetTimer = () => {
    timer.stop();
    setDisplayTime('00:00');
    setAlarmTriggered(false);
    setIsPaused(false);
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
      resumeTimer
    }}>
      {children}
    </TimerContext.Provider>
  );
};

