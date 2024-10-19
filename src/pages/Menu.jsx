import React from 'react'
import { Link } from 'react-router-dom';


const Menu = () => {
  return (
    <div className='page-black'>
<Link to= '/Analog'>
<h2>Analog timer</h2>
</Link>
<Link to= '/Digital'>
<h2>Digital timer</h2>
</Link>
<h2>Analog timer</h2>
<h2>Analog timer</h2>
<h2>Analog timer</h2>
    </div>
  )
}

export default Menu