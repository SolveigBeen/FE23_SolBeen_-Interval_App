import React from 'react';
import { Link } from 'react-router-dom';

const Loading = () => {
  return (
    <div className="page-black">
      <Link to="/SetTimer">
      <img src="/Frame1.svg" alt="Beskrivning av bilden" ></img>
      </Link>
      <h3>INTERVAL</h3>
      <p>For all your timing needs</p>
    </div>
  )
}

export default Loading