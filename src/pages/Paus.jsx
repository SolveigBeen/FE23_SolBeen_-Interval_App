import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importera useNavigate
import {startTimer } from '../services/timer';
import { motion } from "framer-motion";

const Paus = () => {

  const navigate = useNavigate(); // Skapa en instans av navigate
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    setIsAnimating(true); // Starta animationen

    // När användaren klickar på "No Pause", stoppa pausläget och återuppta huvudtimern
    setTimeout(() => {
      startTimer(); // Återuppta huvudtimern
      navigate('/Digital'); //
      console.log("No pause clicked, pause intervals stopped.");
    }, 1000); // Tiden för animationen (1 sekund)
  };

  return (
    <motion.div className="page page-black"
      initial={{ x: 0 }} // Startläge
      animate={isAnimating ? { x: '-100vw' } : {}} // Glid ut åt höger när isAnimating är true
      transition={{ duration: 1 }} 
    >
      <div className="page-header"></div>
      <div className="page-content-container">
        <div className="page-space"></div>
        <div>
          <img src="/Paus.svg" alt="Beskrivning av bilden" />
          <h2>Pause & Breath</h2>
        </div>
        <div className="page-space"></div>
      </div>

      <div className="page-footer">
        <button
          className='page-button button-dark'
          onClick={handleClick}
        >
          No pause, go now!
        </button>
      </div>
    </motion.div>
  );
};

export default Paus;









