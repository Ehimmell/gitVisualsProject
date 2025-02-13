import React, { useState, useEffect } from 'react';
import './Dropdown.css';
export default function Dropdown() {
  const [color, setColor] = useState('black');
  const threshold = 35;
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY <= threshold) {
        setColor('black');
      } else {
        setColor('floralwhite');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);
  const [active, setActive] = useState(false);
  const toggleActive = () => {
    setActive(!active);
  };
  return (
    <div className="dropdown-text" style={{ color }} onClick={toggleActive}>
      <div className={`bar ${active ? 'bar1-active' : 'bar1'}`}></div>
      <div className={`bar ${active ? 'bar2-active' : 'bar2'}`}></div>
      <div className={`bar ${active ? 'bar3-active' : 'bar3'}`}></div>
    </div>
  );
}