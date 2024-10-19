import React, { useContext } from 'react'; 
import { TimerContext } from '../services/timer';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const AlarmView = () => {
  const { abortTimer } = useContext(TimerContext);

  return (
    <div className=" page page-black">
       <div className="page-header"></div>
       <div className="page-content-container">
      <motion.div className=" alarm"
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
    <h2 > Times up! </h2>
    </div>
    <div className="page-footer">
    <Link to="/SetTimer"  onClick={abortTimer}>
        <motion.button
          className='page-button button-dark'
          whileTap={{ scale: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          Abort Timer
        </motion.button>
      </Link>
  </div>
  </div>
  )
}

export default AlarmView