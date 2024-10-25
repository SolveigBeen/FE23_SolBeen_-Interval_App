import React, {  useState, useEffect, } from 'react';
import Nav from '../components/nav';
import { useTimerValue, stopTimer } from '../services/timer';
import { motion } from "framer-motion";
import {  useNavigate } from 'react-router-dom';

const DigitalView = () => {

  const timerValue = useTimerValue(); 
  const [isZoomingOut, setIsZoomingOut] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsZoomingOut(true);
    setTimeout(() => {
      stopTimer();
      navigate("/SetTimer"); 
    }, 300);
};

  return (
    <div className="page page-light">
      <Nav />
      <div className="page-header">interval</div>
      <div className="page-content-container">
        <div className="page-space"></div>
        <motion.div
          className='page-time'
          initial={{ scale: 1, opacity: 1 }}
          animate={isZoomingOut ? { scale: 1.5, opacity: 0 } : {}}
          transition={{ duration: 0.3 }}
        >
          {timerValue}
        </motion.div>
        <div className="page-space"></div>
      </div>
      <div className='page-footer'>
        <motion.button
          className='page-button button-small'
          onClick={handleClick}
          whileTap={{ scale: 0.9, backgroundColor: 'var(--ash)' }}
          transition={{ duration: 0.2 }}
        >
          Abort Timer
        </motion.button>
      </div>
    </div>
  );
}

export default DigitalView;


