import { useState, useEffect } from 'react';
import { Timer } from 'easytimer.js';

// Skapa en global timer-instans
const timer = new Timer(); 

const useTimerValue = () => { 
  const [timerValue, setTimerValue] = useState('00:00'); // Initiera med 0-tid

  useEffect(() => {
    const updateTimerValue = () => {
      setTimerValue(timer.getTimeValues().toString(['minutes', 'seconds']));
    };

    timer.addEventListener('secondsUpdated', updateTimerValue);
    
    // Ta bort eventlyssnaren när komponenten avmonteras
    return () => {
      timer.removeEventListener('secondsUpdated', updateTimerValue);
    };
  }, []); // Tom array så att effekten bara körs en gång vid montering

  return timerValue; // Returnera timer-värdet
};

const stopTimer = () => {
  timer.stop();
};

const pausTimer = () => {
  timer.pause();
};

const startTimer = (startValue, navigate) => {
  timer.stop();
  timer.start({ countdown: true, startValues: { seconds: startValue * 60 } });
  console.log(startValue);
  // Ta bort tidigare lyssnare för targetAchieved om de finns
  timer.removeEventListener('targetAchieved');

  // Lägg till ny lyssnare för när timern når noll
  timer.addEventListener('targetAchieved', () => {
    console.log("Timer reached the target, navigating to Alarm.");
    navigate('/Alarm');
  });
};



// Funktion som returnerar minuter från timern
const timerMinute = () => {
  return timer.getTimeValues().minutes; // Returnera minutvärdet
};

export { useTimerValue, timerMinute, stopTimer, pausTimer, startTimer };

