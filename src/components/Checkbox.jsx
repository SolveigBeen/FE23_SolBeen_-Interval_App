import React, { useContext } from 'react';
import { TimerContext } from '../services/timer';
import './checkbox.css';

const Checkbox = () => {
  const { setIsCheckboxTicked, isCheckboxTicked } = useContext(TimerContext);

  const handleCheckboxChange = () => {
    setIsCheckboxTicked(!isCheckboxTicked);
  };

  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        className="checkBox"
        checked={isCheckboxTicked}
        onChange={handleCheckboxChange}
      />
      <label>1 min break / interval</label>
    </div>
  );
}

export default Checkbox;
