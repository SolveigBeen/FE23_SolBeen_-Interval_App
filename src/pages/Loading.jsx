import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Loading = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  //När img klickas så skiftas sida. Övergång sker med animering där Loading page glider åt höger.
  const handleClick = () => {
    setIsAnimating(true); // Starta animationen

    setTimeout(() => {
      navigate("/SetTimer"); // Navigera efter animationen
    }, 1000); // Tiden för animationen (matchar med duration)
  };

  return (
    <motion.div className="page page-black"
    initial={{ x: 0 }} // Startläge
      animate={isAnimating ? { x: '100vw' } : {}} // Glid ut åt höger när isAnimating är true
      transition={{ duration: 1 }} // Längd på animationen
    >
      <div className="page-header"></div>
      <div className="page-content-container">
       
      <motion.img
          src="/Frame1.svg"
          alt="Beskrivning av bilden"
          onClick={handleClick} // Använd handleClick vid klick
          whileHover={{ scale: 1.2 }} // Liten zoom vid hover
          transition={{ duration: 0.2 }} // Snabb övergång vid hover
        />
        
        <h3>INTERVAL</h3>
        <p>For all your timing needs</p>
      </div>
    </motion.div>
  )
}

export default Loading