import React from 'react';
import { motion } from 'framer-motion';
import './checkbox.css';

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        className="checkBox"
        checked={checked}
        onChange={onChange}
      />
      <label>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;

