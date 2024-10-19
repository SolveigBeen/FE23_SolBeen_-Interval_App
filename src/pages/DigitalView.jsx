import React, { useContext } from 'react'
import Nav from '../components/nav';
import { TimerContext } from '../services/timer';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const DigitalView = () => {
  const { abortTimer, displayTime } = useContext(TimerContext);

  return (
    <div className="page-light ">
      <Nav></Nav>
      <div className="header-title">interval</div>
      <div className="TimerSet-Container">
        <div className="TimerSet">
          <div className='time'    >{displayTime}</div>
        </div>
        </div>
        <Link to="/SetTimer" onClick={abortTimer}>
        <motion.button
          className='stopTimerBtn'
          whileTap={{ scale: 0.5 }}
          onHover={{ scale: 0.2 }}
          transition={{duration:0.6}}
        >
          Abort Timer
        </motion.button>
      </Link>
    </div>
  )
}

export default DigitalView