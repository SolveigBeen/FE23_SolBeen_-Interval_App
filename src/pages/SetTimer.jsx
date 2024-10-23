import React, { useState } from 'react';

import { motion } from 'framer-motion';
import { startTimer, setIsCheckboxTicked } from '../services/timer';
import { useNavigate } from 'react-router-dom';
import Checkbox from '../components/Checkbox';

const SetTimer = () => {
  const [startValue, setStartValue] = useState(10);
  const [rotate, setRotate] = useState(0);
  const [isZoomingOut, setIsZoomingOut] = useState(false);
   const [intervalChecked, setIntervalChecked] = useState(false); 
  const navigate = useNavigate();


  const increment = () => {
    setStartValue((prevValue) => prevValue + 1);
    setRotate((prevRotate) => prevRotate + 180);
  };

  const decrement = () => {
    setStartValue((prevValue) => Math.max(prevValue - 1, 0));
    setRotate((prevRotate) => prevRotate - 180);
  };



   // Hantera när första checkboxen ändras
   const handleCheckboxInterval = (isChecked) => {
    setIntervalChecked(isChecked); // Uppdatera state
    setIsCheckboxTicked(isChecked); // Spara checkbox-status globalt om behövs
  };

  const handleStartTimer = () => {
    startTimer(startValue, navigate);
    setIsZoomingOut(true);

    setTimeout(() => {
      navigate("/Digital");
    }, 500);
  };

  return (
    <motion.div className="page page-light">
     
      <div className="page-header"></div>

      <motion.div
        className="page-content-container"
        initial={{ scale: 1, opacity: 1 }}
        animate={isZoomingOut ? { scale: 0.8, opacity: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="page-Space"></div>
        <div>
          <div className="flexRow">
            <motion.img
              src="/decrement.svg"
              alt="decrease"
              onClick={decrement}
              whileTap={{ scale: 0.7 }}
            />

            <motion.div
              className="page-time"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: rotate }}
              transition={{ duration: 0.5 }}
            >
              <span style={{ transform: `scaleX(${rotate % 360 === 0 ? 1 : -1})` }}>
                {startValue}
              </span>
            </motion.div>

            <motion.img
              src="/increment.svg"
              alt="increase"
              onClick={increment}
              whileTap={{ scale: 0.7 }}
            />
          </div>
          <p>minutes</p>
        </div>
        <div className="page-Space">
          <Checkbox label="Interval" onChange={handleCheckboxInterval} />
          <Checkbox label="1 min break / interval" isChecked={false} />
        </div>
      </motion.div>

      <div className="page-footer">
        <motion.button
          className="page-button button-large"
          onClick={handleStartTimer}
          whileTap={{ scale: 0.9, backgroundColor: 'var(--ash)', duration: 6 }}
        >
          Start Timer
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SetTimer;


