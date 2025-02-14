import React, { useEffect, useState } from 'react';
import './TextCarousel.css';

export default function TextCarousel({ texts, interval = 3000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts, interval]);

  return (
    <div className="text-carousel">
      <p>{texts[currentIndex]}</p>
    </div>
  );
};