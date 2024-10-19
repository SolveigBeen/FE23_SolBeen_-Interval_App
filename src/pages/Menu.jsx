import React from 'react'
import { Link } from 'react-router-dom';
import Nav from '../components/nav';

const Menu = () => {
  return (
    <div className='page page-black'>
       <Nav></Nav>
      <div className="page-content-container">
        <Link to= '/Analog'>
          <h2>Analog timer</h2>
        </Link>
        <Link to= '/Digital'>
          <h2>Digital timer</h2>
        </Link>
          <h2>Analog timer</h2>
          <h2>Analog timer</h2>
          <h2>Analog timer</h2>
      </div >
    </div>
  )
}

export default Menu