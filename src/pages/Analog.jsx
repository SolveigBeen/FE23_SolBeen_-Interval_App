import React, { useState, useEffect, useContext } from 'react';
import Nav from '../components/nav';
import { TimerContext } from '../services/timer';
import {  useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import './analog.css';

const Analog = () => {
  const { displayTime, alarmTriggered } = useContext(TimerContext);
  const navigate = useNavigate();
  const [isZoomingOut, setIsZoomingOut] = useState(false); // För zoom/fade-out animation 

  useEffect(() => {
    if (alarmTriggered) {
      navigate('/Alarm'); // Navigera till AlarmView om tiden är 00:00
    }
  }, [alarmTriggered, navigate]); // Kör effekten varje gång displayTime uppdateras

  const handleClick = () => {
    setIsZoomingOut(true); // Starta zoom-out animationen

    // Omdirigera efter animationen
    setTimeout(() => {
      navigate("/SetTimer"); // Omdirigering efter animationen
    }, 300); // 300ms väntetid för animationen
  };

  const secondMarks = [];
  for (let i = 0; i < 60; i++) {
    secondMarks.push(
      <div
        key={i}
        className="second-mark"
        style={{ transform: `rotate(${i * 6}deg) translate(8.5rem)` }}
      ></div>
    );
  }

  const [secondAngle, setSecondAngle] = useState(360); // Vinkel för sekunder
  const [minuteAngle, setMinuteAngle] = useState(360); // Vinkel för minuter

  // Funktion för att hämta sekunder från displayTime
  const getSecondsFromTime = (time) => {
    const parts = time.split(':');
    return Number(parts[1]); // Hämta sekunder (2:a delen)
  };

  // Funktion för att hämta minuter från displayTime
  const getMinutesFromTime = (time) => {
    const parts = time.split(':');
    return Number(parts[0]); // Hämta minuter (1:a delen)
  };

  useEffect(() => {
    const totalSeconds = getSecondsFromTime(displayTime);
    const totalMinutes = getMinutesFromTime(displayTime);

    // Beräkna initiala vinklar
    const initialSecondAngle = (totalSeconds / 60) * 360; // Vinkel för sekunder
    const initialMinuteAngle = (totalMinutes / 60) * 360; // Vinkel för minuter

    setSecondAngle(initialSecondAngle);
    setMinuteAngle(initialMinuteAngle);

    const interval = setInterval(() => {
      setSecondAngle((prevAngle) => {
        const newAngle = prevAngle - 6; // Minskar 6 grader per sekund
        if (newAngle < 0) {
          setMinuteAngle((prevMinuteAngle) => {
            const updatedMinuteAngle = prevMinuteAngle - 6; // Minska minutvinkeln
            return updatedMinuteAngle >= 0 ? updatedMinuteAngle : 0; // Se till att vinkeln inte går under 0
          });
          return 360; // Återställ sekundvinkeln när den når 0
        }
        return newAngle;
      });
    }, 1000);

    return () => clearInterval(interval); // Rensa intervallet vid unmount
  }, [displayTime]);

  return (
    <div className="page page-light ">
      <Nav />
      <div className="page-header">interval</div>
      <div className="page-content-container">
        <motion.div className="clock"
          initial={{ scale: 1, opacity: 1 }} // Startläge
          animate={isZoomingOut ? { scale: 1.5, opacity: 0 } : {}} // Zoom-out och fade-out vid klick
          transition={{ duration: 0.3 }} // Ändrad längd på animationen till 300ms
        >
          {secondMarks}
          <div className="segment minute-segment"
            style={{
              background: `conic-gradient(#f93434c0 0deg ${minuteAngle}deg, transparent ${minuteAngle}deg 360deg)`,
              transform: `translate(-50%, -50%)`,
            }}
          />
          <div className="segment second-segment"
            style={{
              background: `conic-gradient(#f93434a0 0deg ${secondAngle}deg, transparent ${secondAngle}deg 360deg)`,
              transform: `translate(-50%, -50%)`,
            }}
          />
          <div className="clock-center"></div>
        </motion.div>
      </div>
      <div className="page-footer">
        <motion.button
          className='page-button button-small'
          onClick={handleClick}
          whileTap={{ scale: 0.9, backgroundColor: 'var(--ash)' }} // Ändrar bakgrundsfärg till --ash vid klick
          transition={{ duration: 0.2 }} // Snabb övergång för bakgrundsfärg
        >
          Abort Timer
        </motion.button>
      </div>
    </div>
  );
}

export default Analog;

