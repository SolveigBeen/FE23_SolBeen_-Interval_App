import React, { useContext, useState, useEffect, } from 'react';
import Nav from '../components/nav';
import { TimerContext } from '../services/timer';
import { motion } from "framer-motion";
import {  useNavigate } from 'react-router-dom';

const DigitalView = () => {
  const { displayTime , alarmTriggered} = useContext(TimerContext);
  
  const [isZoomingOut, setIsZoomingOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (alarmTriggered) {
      navigate('/Alarm'); // Navigera till AlarmView om tiden är 00:00
    }
  }, [alarmTriggered, navigate]); // Kör effekten varje gång displayTime uppdateras



  const handleClick = () => {
    setIsZoomingOut(true);
    setTimeout(() => {
      navigate("/SetTimer"); 
      stopTimer();// This should be a defined route
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
          {displayTime}
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