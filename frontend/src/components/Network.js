
import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';

export default function Network() {
  const blueprints = [[0, 0, 1], [0, 1, 1], [1, 0, 0]];
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
    const newCircles = blueprints.map((bp) => ({
      id: Math.random(),
      cx: (bp[0] + 1) * (rad * 4),
      cy: (rad * 4) * ((bp[2] - bp[1]) + 1),
      fill:"gray",
        stroke:"#A9A9A9",
        strokeWidth:"4",
      r: rad
    }));

    d3.select(svgRef.current)
      .call(zoomBehavior);

    setCircles(newCircles);
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
            {circles.map((c) => (
                <circle
                    key={c.id}
                    cx={c.cx}
                    cy={c.cy}
                    r={c.r}
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