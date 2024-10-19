import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Meny from '../components/Meny';

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev); // Toggla menyn
  };

  return (
    <div>
      <img 
        src={isMenuOpen ? './navicon-white.svg' : './navicon.svg'} 
        alt='navigation' 
        onClick={toggleMenu} 
        className='nav-icon'  
        style={{ cursor: 'pointer' }}
      />
      <Meny isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}

export default Nav;




