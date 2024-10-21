import React, { useState, useContext } from 'react';
import Nav from '../components/nav';
import { motion } from 'framer-motion';
import { TimerContext } from '../services/timer';
import { useNavigate } from 'react-router-dom';
import Checkbox from '../components/Checkbox';

const SetTimer = () => {
  const [timerValue, setTimerValue] = useState(10);
  const [rotate, setRotate] = useState(0);
  const [isZoomingOut, setIsZoomingOut] = useState(false);

const { startTimer, resetTimer, lastView, setIsCheckboxTicked, isCheckboxTicked } = useContext(TimerContext);
  const navigate = useNavigate();

  const increment = () => {
    setTimerValue((prevValue) => prevValue + 1);
    setRotate((prevRotate) => prevRotate + 180);
  };

  const decrement = () => {
    setTimerValue((prevValue) => Math.max(prevValue - 1, 0));
    setRotate((prevRotate) => prevRotate - 180);
  };

  const handleCheckboxInterval = (isChecked) => {
    setIsCheckboxTicked(isChecked); // Spara checkbox-status
  };

  const handleClick = () => {
    startTimer(timerValue, navigate, lastView);
    setIsZoomingOut(true);

    setTimeout(() => {
      navigate(lastView);
    }, 500);
  };

  return (
    <motion.div className="page page-light">
      <Nav />
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
                {timerValue}
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
          <Checkbox label="Interval" isChecked={isCheckboxTicked} onChange={handleCheckboxInterval} />
          <Checkbox label="1 min break / interval" isChecked={false} onChange={() => {}} />
        </div>
      </motion.div>

      <div className="page-footer">
        <motion.button
          className="page-button button-large"
          onClick={handleClick}
          whileTap={{ scale: 0.9, backgroundColor: 'var(--ash)', duration: 6 }}
        >
          Start Timer
        </motion.button>
      </div>
    </motion.div>
  );
};

export default SetTimer;


