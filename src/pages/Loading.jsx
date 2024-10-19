import React from 'react';
import { Link } from 'react-router-dom';

const Loading = () => {
  return (
    <div className="page page-black">
      <div className="page-header"></div>
      <div className="page-content-container">
        <Link to="/SetTimer">
        <img src="/Frame1.svg" alt="Beskrivning av bilden" ></img>
        </Link>
        <h3>INTERVAL</h3>
        <p>For all your timing needs</p>
      </div>
    </div>
  )
}

export default Loading