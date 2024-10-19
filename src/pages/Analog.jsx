import React, { useState, useEffect, useContext } from 'react';
import Nav from '../components/nav';
import { TimerContext } from '../services/timer';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import './analog.css';

const Analog = () => {
  const { abortTimer, displayTime } = useContext(TimerContext);

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
    return Number(parts[2]); // Hämta sekunder (3:e delen)
  };

  // Funktion för att hämta minuter från displayTime
  const getMinutesFromTime = (time) => {
    const parts = time.split(':');
    return Number(parts[1]); // Hämta minuter (2:a delen)
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
    <div className="page-light ">
      <Nav></Nav>
      <div className="header-title">interval</div>
      <div className="TimerSet-Container">
        <div className="TimerSet">
          <div className="clock">
            {secondMarks}
            <div className="segment minute-segment"
              style={{
                background: `conic-gradient(red 0deg ${minuteAngle}deg, transparent ${minuteAngle}deg 360deg)`, transform: `translate(-50%, -50%) `,
              }}
            />

            <div className="segment second-segment"
              style={{background: `conic-gradient(yellow 0deg ${secondAngle}deg, transparent ${secondAngle}deg 360deg)`,
              transform: `translate(-50%, -50%)`, 
            }}
            />
            
            <div className="clock-center"></div>
          </div>
        </div>
      </div>
      <Link to="/SetTimer" onClick={abortTimer}>
        <motion.button
          className='stopTimerBtn'
          whileTap={{ scale: 0.5 }}
        
          transition={{ duration: 0.6 }}
        >
          Abort Timer
        </motion.button>
      </Link>
    </div>
  );
}

export default Analog;
