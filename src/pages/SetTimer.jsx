import React, { useState, useContext} from 'react';
import './setTimer.css';
import Nav from '../components/nav';
import { motion } from "framer-motion";
import { TimerContext } from '../services/timer';
import { Link } from 'react-router-dom';

const SetTimer = () => {

  const [timerValue, setTimerValue] = useState(10);
  const [rotate, setRotate] = useState(0);
  const { startTimer } = useContext(TimerContext); // Använd context här


  const increment = () => {
    setTimerValue(prevValue => prevValue + 1); // Ökar värdet med 1
    setRotate(prevRotate => prevRotate + 180);
  };

  const decrement = () => {
    setTimerValue(prevValue => Math.max(prevValue - 1, 0)); // Minskar värdet med 1, med ett minimum av 0
    setRotate(prevRotate => prevRotate - 180);
  };


  return (
    <div className="page-light">
      <Nav></Nav>
      <div className="TimerSet-Container">
        <div className="TimerSet">
          <motion.img 
            src='/decrement.svg' 
            alt="decrease"  
            onClick={decrement}  
            whileTap={{ scale: 0.7 }}  
          />

          <motion.div className="time" 
            initial={{ rotateY: 0 }} // Initial rotation
            animate={{ rotateY: rotate }} // Roterar 180 grader för ökning/minskning
            transition={{ duration: 0.5 }}
          >
            <span style={{ transform: `scaleX(${rotate % 360 === 0 ? 1 : -1})` }}>
              {timerValue}
            </span>
          </motion.div>

          <motion.img src='/increment.svg' alt="increase" onClick={increment} whileTap={{ scale: 0.7 }} />
        </div>
        <p>minutes</p>
      </div>
      <Link to= "/Analog" >
      <button className='stopTimerBtn' onClick={() => startTimer(timerValue)}>Start Timer</button>
      </Link>
    </div>
  );
}

export default SetTimer;
