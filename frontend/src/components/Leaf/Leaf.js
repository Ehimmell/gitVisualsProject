import React, {useMemo} from 'react';
import './Leaf.css';

const Leaf = ({ start, end }) => {
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

  const randomGreen = useMemo(() => {
    return Math.floor(Math.random() * (40 - 10 + 1)) + 10;
  }, []);

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
      <g transform={`translate(${start.x}, ${start.y}) rotate(${angle})`}>
        <path
          d={pathData}
          className="Leaf__shape"
          fill={`rgba(0,${randomGreen},0,0.6)`}
          stroke="rgba(0,100,0,0.7)"
          strokeWidth="2"
        />

        <line
          x1="0"
          y1="0"
          x2={L}
          y2="0"
          className="Leaf__vein"
          stroke="rgba(0,100,0,0.9)"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
};

export default Leaf;