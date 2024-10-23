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

    return () => {
      timer.removeEventListener('secondsUpdated', updateTimerValue); // Ta bort event listener vid avmontering
    };
  }, []); 

  return timerValue; // Returnera timer-värdet
};

// Funktioner för att stoppa och pausa timern
const stopTimer = () => {
  timer.stop();
};

const pausTimer = () => {
  timer.pause();
};


const resumeTimer = () => {
  const remainingTime = timer.getTotalTimeValues().seconds; // Hämtar kvarvarande tid
  timer.start({
    countdown: true,
    startValues: { seconds: remainingTime } // Återstarta från där den pausades
  });
};

let isCheckboxTickedGlobal = false; // Global variabel för checkboxstatus

const startTimer = (startValue, navigate) => {
  timer.stop(); // Stoppa eventuell tidigare timer

  // Kolla om checkbox är markerad
  if (isCheckboxTickedGlobal) {
    // Starta timern med en paus efter 5 sekunder kvar
    timer.start({
      countdown: true,
      startValues: { seconds: startValue * 60 },
      target: { seconds: startValue * 60 - 30 } // Pausmål vid 30 sekunder mindre än startvärdet
    });
  } else {
    // Starta nedräkningen utan paus
    timer.start({
      countdown: true,
      startValues: { seconds: startValue * 60 }
    });
  }

  console.log(`Timer started with value: ${startValue}`);

  // Ta bort tidigare 'targetAchieved' event listener om den finns
  timer.removeEventListener('targetAchieved');

  // Lägg till ny listener för när timern når noll
  timer.addEventListener('targetAchieved', () => {
    if (isCheckboxTickedGlobal) {
      console.log("Timer reached the Paus target, navigating to Paus.");
      pausTimer();  // Pausa timern
      navigate('/Paus');  // Navigera till Paus-sidan
    } else {
      console.log("Timer reached the target, navigating to Alarm.");
      navigate('/Alarm');  // Navigera till Alarm-sidan
    }
  });
};


// Funktion för att uppdatera checkboxens status globalt
const setIsCheckboxTicked = (isChecked) => {
  isCheckboxTickedGlobal = isChecked;
};

export { useTimerValue, stopTimer, pausTimer, resumeTimer, startTimer, setIsCheckboxTicked };


