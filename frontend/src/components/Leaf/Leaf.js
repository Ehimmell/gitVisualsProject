import React, { useMemo } from 'react';
import './Leaf.css';

const Leaf = ({ start, end, type }) => {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const L = Math.sqrt(dx * dx + dy * dy);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  const pathData = `
    M 0 0
    C ${L / 8} ${-L / 4}, ${3 * L / 8} ${-L / 2}, ${L} 0
    C ${3 * L / 8} ${L / 2}, ${L / 8} ${L / 4}, 0 0
    Z
  `;

    const leafFill = () => {
        if (type === 'node') return "url(#leafGradient)";
        if (type === 'page') return 'url(#pageGradient)';
    }

  return (
    <svg
      className="Leaf"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'visible',
      }}
    >
        <defs>
            <linearGradient id="leafGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(160, 228, 192)"/>
                <stop offset="100%" stopColor="rgb(216, 223, 206)"/>
            </linearGradient>
            <linearGradient id="pageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="40%" stopColor="lightpink"/>
                <stop offset="100%" stopColor="white"/>
            </linearGradient>
        </defs>
        <g transform={`translate(${start.x}, ${start.y}) rotate(${angle})`}>
            <path
                d={pathData}
                className="Leaf__shape"
                fill={leafFill()}
                stroke="rgba(140, 190, 160, 0.8)"
          strokeWidth="2"
        />
        <line
          x1="0"
          y1="0"
          x2={L}
          y2="0"
          className="Leaf__vein"
          stroke="rgba(140, 190, 160, 0.9)"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};

export default Leaf;