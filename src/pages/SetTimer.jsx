import React, { useState, useContext, useEffect } from 'react';
import Nav from '../components/nav';
import { motion } from "framer-motion";
import { TimerContext } from '../services/timer';
import { useNavigate } from 'react-router-dom';

const SetTimer = () => {
  const [timerValue, setTimerValue] = useState(10);
  const [rotate, setRotate] = useState(0);  
  const [isZoomingOut, setIsZoomingOut] = useState(false); // För zoom/fade-out animation när timer startas och sida byts.
  const { startTimer, resetTimer } = useContext(TimerContext);
  const navigate = useNavigate();

  useEffect(() => {
    resetTimer();
  }, [resetTimer]);


  const increment = () => {
    setTimerValue(prevValue => prevValue + 1);
    setRotate(prevRotate => prevRotate + 180);
  };

  const decrement = () => {
    setTimerValue(prevValue => Math.max(prevValue - 1, 0));
    setRotate(prevRotate => prevRotate - 180);
  };

  const handleClick = () => {
    startTimer(timerValue);
    setIsZoomingOut(true); // Starta zoom-out animationen

    setTimeout(() => {
      navigate("/Analog"); // Omdirigering efter animationen
    }, 500); // 500ms väntetid för animationen
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
        <div className="flexRow">
          <motion.img
            src='/decrement.svg'
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
            src='/increment.svg'
            alt="increase"
            onClick={increment}
            whileTap={{ scale: 0.7 }}
          />
        </div>
        <p>minutes</p>
      </motion.div>

      <div className="page-footer">
        <motion.button
          className="page-button button-large"
          onClick={handleClick}
          whileTap={{ scale: 0.9, backgroundColor: 'var(--ash)' ,   duration:6 }} // Ändrar bakgrundsfärg vid klick
        >
          Start Timer
        </motion.button>
      </div>
    </motion.div>
  );
}

export default SetTimer;





