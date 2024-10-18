import React from 'react'
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div>
      <Link to="/Menu">
      <img src='./navicon.svg' alt= 'navigation' 
      style={{
        position: 'absolute', 
        top: '10px', 
        left: '10px', 
        margin: '0'
      }}></img>
      </Link>
    </div>
  )
}

export default Nav