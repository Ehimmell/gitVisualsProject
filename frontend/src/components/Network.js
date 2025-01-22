
import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';
import Node from './classes/Node';

export default function Network(blueprints) {
  //const blueprints = [[0, 0, 1, [1, 4]], [0, 1, 1, [1, 3]], [1, 0, 2, [1]], [1, 1, 2, [1]], [1, 2, 2, [1]], [2, 0, 0, [4]]];
  const [circles, setCircles] = useState([]);

  const rad = 50;

  const svgRef = useRef(null);
  const gRef = useRef(null);

  const zoomBehavior = d3.zoom()
    .scaleExtent([0.1, 1])
    .on('zoom', (event) => {
      d3.select(gRef.current)
        .attr('transform', event.transform);
    });

  useEffect(() => {
    const nodes = blueprints.map((b) => {
      return new Node(
        b[0],
          b[1],
          (b[2] + 1) * rad * 4,
          ((b[4] - b[3]) + 1) * rad * 4,
        rad,
        'gray',
        '#A9A9A9',
        4,
        b[5]
      );
    });

    d3.select(svgRef.current)
      .call(zoomBehavior);

    setCircles(nodes);
  }, []);

  return (
      <div>
        <svg
            ref={svgRef}
            width="100%"
            height="100vh"
            style={{
              touchAction:'none'
          }}
        >
          <g ref={gRef}>
            {circles.map((sourceCircle) => {
            return sourceCircle.connections.map((connectedIndex) => {
              const targetCircle = circles[connectedIndex];
              if (!targetCircle) return null;

              return (
                <line
                  key={`${sourceCircle.id}-to-${targetCircle.id}`}
                  x1={sourceCircle.cx}
                  y1={sourceCircle.cy}
                  x2={targetCircle.cx}
                  y2={targetCircle.cy}
                  stroke="white"
                  strokeWidth={2}
                />
              );
            });
          })}
            {circles.map((c) => (
                <circle
                    key={c.id}
                    cx={c.cx}
                    cy={c.cy}
                    r={c.rad}
                    fill={c.fill}
                    stroke={c.stroke}
                    strokeWidth={c.strokeWidth}
                />
            ))}
          </g>
        </svg>
      </div>
  );
}