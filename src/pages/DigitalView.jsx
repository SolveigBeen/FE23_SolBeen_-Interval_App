import React, { useContext, useEffect, useState } from 'react';
import Nav from '../components/nav';
import { TimerContext } from '../services/timer';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const DigitalView = () => {
  const { abortTimer, displayTime, alarmTriggered } = useContext(TimerContext);
  const navigate = useNavigate();
  const [isZoomingOut, setIsZoomingOut] = useState(false); // För zoom/fade-out animation

  useEffect(() => {
    if (alarmTriggered) {
      navigate('/Alarm'); // Navigera till AlarmView om tiden är 00:00
    }
  }, [alarmTriggered, navigate]); // Kör effekten varje gång displayTime uppdateras

  const handleClick = () => {
    setIsZoomingOut(true); // Starta zoom-out animationen

    setTimeout(() => {
      navigate("/SetTimer"); // Omdirigering efter animationen
    }, 300); // 300ms väntetid för animationen
  };

  return (
    <div className="page page-light">
      <Nav />
      <div className="page-header">interval</div>
      <div className="page-content-container">
        <motion.div
          className='page-time'
          initial={{ scale: 1, opacity: 1 }} // Startläge
          animate={isZoomingOut ? { scale: 1.5, opacity: 0 } : {}} // Zoom-out och fade-out vid klick
          transition={{ duration: 0.3 }} // Längd på animationen
        >
          {displayTime}
        </motion.div>
      </div>
      <div className='page-footer'>
        <motion.button
          className='page-button button-small'
          onClick={handleClick}
          whileTap={{ scale: 0.9, backgroundColor: 'var(--ash)' }} // Ändrar bakgrundsfärg vid klick
          transition={{ duration: 0.2 }} // Snabb övergång för bakgrundsfärg
        >
          Abort Timer
        </motion.button>
      </div>
    </div>
  );
}

export default DigitalView;
