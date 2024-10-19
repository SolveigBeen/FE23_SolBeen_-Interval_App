import React, { useContext, useEffect } from 'react'
import Nav from '../components/nav';
import { TimerContext } from '../services/timer';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const DigitalView = () => {
  const { abortTimer, displayTime, alarmTriggered  } = useContext(TimerContext);
  const navigate = useNavigate(); 

  useEffect(() => {
    if  (alarmTriggered) {
      navigate('/Alarm'); // Navigera till AlarmView om tiden är 00:00
    }
  }, [ alarmTriggered, navigate]); // Kör effekten varje gång displayTime uppdateras

  return (
    <div className=" page page-light ">
      <Nav></Nav>
      <div className="page-header">interval</div>
      <div className="page-content-container">
        <div className='page-time' >{displayTime}</div>
      </div >
      <div className='page-footer'>
        <Link to="/SetTimer" onClick={abortTimer}>
          <motion.button
            className='page-button button-small'
            whileTap={{ scale: 0.5 }}
            transition={{duration:0.6}}
          >
          Abort Timer
          </motion.button>
        </Link>
      </div>
    </div>
  )
}

export default DigitalView