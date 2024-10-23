import React, { useState, useEffect } from 'react';
import Nav from '../components/nav';
import { useTimerValue } from '../services/timer';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import './analog.css';

const Analog = () => {
  const timerValue = useTimerValue(); 
  const navigate = useNavigate();
  const [isZoomingOut, setIsZoomingOut] = useState(false);

  // Initial angles for second and minute hands
  const [secondAngle, setSecondAngle] = useState(360);
  const [minuteAngle, setMinuteAngle] = useState(360);

  // Function to get seconds from timer value
  const getSecondsFromTime = (time) => {
    const parts = time.split(':');
    return Number(parts[1]);
  };

  // Function to get minutes from timer value
  const getMinutesFromTime = (time) => {
    const parts = time.split(':');
    return Number(parts[0]);
  };

  useEffect(() => {
    const totalSeconds = getSecondsFromTime(timerValue);
    const totalMinutes = getMinutesFromTime(timerValue);

    // Calculate angles based on timer values
    const newSecondAngle = (totalSeconds / 60) * 360;
    const newMinuteAngle = (totalMinutes / 60) * 360;

    setSecondAngle(newSecondAngle);
    setMinuteAngle(newMinuteAngle);
    
  }, [timerValue]); // Run this effect whenever timerValue changes

  const handleClick = () => {
    setIsZoomingOut(true);

    setTimeout(() => {
      navigate("/SetTimer");
    }, 300);
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

  return (
    <div className="page page-light">
      <Nav />
      <div className="page-header">interval</div>
      <div className="page-content-container">
        <div className="page-space"></div>
        <motion.div
          className="clock"
          initial={{ scale: 1, opacity: 1 }}
          animate={isZoomingOut ? { scale: 1.5, opacity: 0 } : {}}
          transition={{ duration: 0.3 }}
        >
          {secondMarks}
          <div
            className="segment minute-segment"
            style={{
              background: `conic-gradient(#f93434c0 0deg ${minuteAngle}deg, transparent ${minuteAngle}deg 360deg)`,
              transform: `translate(-50%, -50%)`,
            }}
          />
          <div
            className="segment second-segment"
            style={{
              background: `conic-gradient(#f93434a0 0deg ${secondAngle}deg, transparent ${secondAngle}deg 360deg)`,
              transform: `translate(-50%, -50%)`,
            }}
          />
          <div className="clock-center"></div>
        </motion.div>
        <div className="page-space"></div>
      </div>
      <div className="page-footer">
        <motion.button
          className="page-button button-small"
          onClick={handleClick}
          whileTap={{ scale: 0.9, backgroundColor: 'var(--ash)' }}
          transition={{ duration: 0.2 }}
        >
          Abort Timer
        </motion.button>
      </div>
    </div>
  );
};

export default Analog;


