import React, { useContext } from 'react'
import Nav from '../components/nav';
import { TimerContext } from '../services/timer';

const Analog = () => {
  const { startTimer, displayTime } = useContext(TimerContext);

  return (
    <div>
      <Nav></Nav>
      <h2>interval</h2>
      <div>Clock</div>
      <p>Display Time: {displayTime}</p>
      <button>Abort Timer</button>
      </div>
  )
}

export default Analog