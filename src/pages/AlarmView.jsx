import React, { useState } from 'react'; 
import { motion } from "framer-motion";
import {  useNavigate } from 'react-router-dom';

const AlarmView = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsAnimating(true); // Starta animationen

    setTimeout(() => {
      navigate("/SetTimer"); // Navigera efter animationen
    }, 1000); // Tiden för animationen (matchar med duration)
  };


  return (
    <motion.div className=" page page-black"
    initial={{ x: 0 }} // Startläge
      animate={isAnimating ? { x: '-100vw' } : {}} // Glid ut åt höger när isAnimating är true
      transition={{ duration: 1 }} // Längd på animationen
    >
      <div className="page-header"></div>
      <div className="page-content-container">
        <div className="page-space"></div>
          <div>
            <motion.div className=" alarm"
              animate={{
                rotate: [0, 10, -10, 0], 
                scale: [1, 1.1, 1, 1.1, 1], 
              }} 
              transition={{
                duration: 0.2, 
                repeat: Infinity, 
                repeatType: 'loop', 
              }}>
              <img src="/alarm_icon.svg" alt="Alarming bell" ></img>
            </motion.div>
            <h2 > Times up! </h2>
          </div>
          <div className="page-space"></div>
        </div>
        <div className="page-footer">
    
          <motion.button
            className='page-button button-dark'
            whileTap={{ scale: 0.8 }}
            transition={{ duration: 0.6 }}
            onClick={handleClick}
          >
          Abort Timer
          </motion.button>
    
        </div>
    </motion.div>
  )
}

export default AlarmView