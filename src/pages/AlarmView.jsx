import React from 'react'
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const AlarmView = () => {
  return (
    <div className="page-black">
      <motion.div className="alarm"
        animate={{
          rotate: [0, 10, -10, 0], // Vinklar fram och tillbaka
          scale: [1, 1.1, 1, 1.1, 1], // Zoomar in och ut för mer ilsket uttryck
          
        }} 
        transition={{
          duration: 0.2, // Hur länge varje rotation varar
          repeat: Infinity, // Loopar oändligt
          repeatType: 'loop', // Loopar hela animationen
        }}>
    <img src="/alarm_icon.svg" alt="Beskrivning av bilden" ></img>
    </motion.div>
    <h2> Times up! </h2>
    <Link to="/SetTimer" >
        <motion.button
          className='stopTimerBtn'
          whileTap={{ scale: 0.5 }}
        
          transition={{ duration: 0.6 }}
        >
          Abort Timer
        </motion.button>
      </Link>
  </div>
  )
}

export default AlarmView