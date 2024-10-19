import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const Meny = ({ isOpen, onClose }) => {
  return (
    <motion.div
      className="navigation-container"
      initial={{ opacity: 0, y: '-100vh' }}
      animate={isOpen ? { opacity: 1, y: '0' } : { opacity: 0, y: '-100vh' }}
      exit={{ y: '-100vh' }}
      transition={{ duration: 0.8 }} // Samma för både öppning och stängning
      onClick={onClose} // Stäng menyn när man klickar utanför
    >
      <motion.div
        className="meny-content"
        initial={{ opacity: 0 }} // Startposition för innehållet
        animate={isOpen ? { opacity: 1 } : { opacity: 0 }} // Endast visa när menyn är öppen
        exit={{ opacity: 0 }} // Försvinner vid stängning
        transition={{ duration: 0.8 }} // Tidsinställning för innehållet
        onClick={(e) => e.stopPropagation()} // Förhindra att menyn stängs när man klickar inuti
      >
        <Link to="/Analog" onClick={onClose}>
          <motion.h2 className="menu-links" whileHover={{ scale: 1.2 }} 
           transition={{ duration: 0.2 }}>Analog Timer</motion.h2>
        </Link>
        <Link to="/Digital" onClick={onClose}>
          <motion.h2 className="menu-links"
           whileHover={{ scale: 1.2 }} 
           transition={{ duration: 0.2 }}>Digital Timer</motion.h2>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default Meny;



