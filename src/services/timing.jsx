import React from 'react'
import { Timer } from 'easytimer.js';

const Timing = () => {

  var timer =new Timer();
  timer.start({precision: 'seconds'});
  return (
    <div>timing {timer}</div>
  )
}

export default Timing