import React, {  useState, useEffect } from 'react';
import Nav from '../components/nav';
import { useTimerValue } from '../services/timer';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const TextView = () => {

  const timerValue = useTimerValue(); 
  const [isZoomingOut, setIsZoomingOut] = useState(false);
  const [animateKey, setAnimateKey] = useState(0); // State för att trigga animation
  const navigate = useNavigate();


  const handleClick = () => {
    setIsZoomingOut(true);
    setTimeout(() => {
      navigate("/SetTimer"); // Navigera tillbaka till TimerSet
    }, 300);
  };

  const numberToText = (num) => {
    const numbersInText = [
      "noll", "en", "två", "tre", "fyra", "fem", "sex", "sju", "åtta", "nio", "tio",
      "elva", "tolv", "tretton", "fjorton", "femton", "sexton", "sjutton", "arton", "nitton",
      "tjugo", "tjugoen", "tjugotvå", "tjugotre", "tjugofyra", "tjugofem", "tjugosex",
      "tjugosju", "tjugoåtta", "tjugonio", "trettio", "trettioen", "trettiotvå", "trettiotre",
      "trettiofyra", "trettiofem", "trettiosex", "trettiosju", "trettioåtta", "trettionio", 
      "fyrtio", "femtio", "femtioen", "femtiotvå", "femtiotre", "femtiofyra", "femtiofem", 
      "femtiosex", "femtiosju", "femtioåtta", "femtionio", "sextio", 
    ];

    return numbersInText[num] || num.toString(); // Returnera textrepresentationen eller siffran som sträng
  };

  const formatTimeAsText = (time) => {
    const [minutes, seconds] = time.split(':').map(Number);
    return { minutes, seconds }; // Returnera både minuter och sekunder som ett objekt
  };

  const { minutes, seconds } = formatTimeAsText(timerValue);

  const minuteText = minutes === 1 ? "en" : `${numberToText(minutes)}`;
  const secondText = seconds === 1 ? "en" : `${numberToText(seconds)}`;

  useEffect(() => {
    // När minuter eller sekunder ändras, uppdatera animateKey
    setAnimateKey(prev => prev + 1);
  }, [minutes, seconds]);

  return (
    <div className="page page-light">
      <Nav />
      <div className="page-header">interval</div>
      <div className="page-content-container">
        <div className="page-space"></div>
        <motion.div
          className='page-texttime'
          initial={{ opacity: 1 }}
          animate={isZoomingOut ? { scale: 1.5, opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="large-number"
            key={animateKey} // Använd animateKey för att trigga omrendering
            initial={{ scale: 1, opacity: 0 }} // Starta från 1
            animate={{ scale: 1.1, opacity: 1 }} // Skala upp
            transition={{ duration: 0.3 }} // För snabbare transition
          >
            {minutes > 0 ? minuteText : ''}
          </motion.div>
          {/* Villkorlig rendering för att dölja "minuter" om minutes är 0 */}
          {minutes > 0 && <span> minuter </span>}

          {minutes > 0 && seconds > 0 && <span> och </span>} {/* Lägg till "och" om både minuter och sekunder är mer än 0 */}

          <motion.div 
            className="large-number"
            key={animateKey + 1} // Använd animateKey + 1 för att trigga omrendering
            initial={{ scale: 1, opacity: 0 }} // Starta från 1
            animate={{ scale: 1.1, opacity: 1 }} // Skala upp
            transition={{ duration: 0.7 }} // För snabbare transition
          >
            {seconds > 0 ? secondText : ''}
          </motion.div>
          <span> sekunder </span>
          <span>{(minutes > 0 || seconds > 0) ? " kvar" : ""}</span>
        </motion.div>
        <div className="page-space"></div>
      </div>
      <div className='page-footer'>
        <motion.button
          className='page-button button-small'
          onClick={handleClick}
          whileTap={{ scale: 0.9, backgroundColor: 'var(--ash)' }}
          transition={{ duration: 0.2 }}
        >
          Abort Timer
        </motion.button>
      </div>
    </div>
  );
}

export default TextView;







