import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import Node from './classes/Node';
import RepoTreeAPIHandler from './Logistics/APIHandler';

export default function Network() {
  const [circles, setCircles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const rad = 50;

  const svgRef = useRef(null);
  const gRef = useRef(null);

  const zoomBehavior = d3.zoom()
    .scaleExtent([0.1, 5])
    .on('zoom', (event) => {
      if (gRef.current) {
        d3.select(gRef.current)
          .attr('transform', event.transform);
      }
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const blueprints = await RepoTreeAPIHandler('Ehimmell', 'launchPad2024-5Project');

        const shaMap = new Map();

        blueprints.forEach((b, i) => {
            shaMap.set(b[0], i);
        });

        if (!Array.isArray(blueprints)) {
          throw new Error('Blueprints data is not an array.');
        }

        const nodes = blueprints.map((b, i) => {
          console.log(`Mapping blueprint ${i}:`, b);
          if (!Array.isArray(b) || b.length < 6) {
            console.warn(`Blueprint ${i} is malformed:`, b);
            return null;
          }

          const node = new Node(
              shaMap.get(b[0]) || 0,
            b[0],
            b[1].length < 13 ? b[1] : b[1].slice(0, 13) + '...',
            (b[2] + 1) * rad * 4,
            ((b[4] - b[3]) + 1) * rad * 4,
            rad,
            'gray',
            '#A9A9A9',
            4,
            b[5].map((p) => shaMap.get(p))
          );
          return node;
        }).filter(node => node !== null);

        setCircles(nodes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (svgRef.current) {
      d3.select(svgRef.current)
        .call(zoomBehavior);
    }

    return () => {
      if (svgRef.current) {
        d3.select(svgRef.current).on('.zoom', null);
      }
    };
  }, [zoomBehavior, circles]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <svg
        ref={svgRef}
        width="100%"
        height="100vh"
        style={{ touchAction: 'none' }}
      >
        <g ref={gRef}>
          {circles.map((sourceCircle) =>
            sourceCircle.connections.map((connectedIndex) => {
              const targetCircle = circles[connectedIndex];
              if (!targetCircle) {
                console.warn(
                  `Invalid connection index ${connectedIndex} ` +
                  `in sourceCircle ${sourceCircle.id}`
                );
                return null;
              }

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
            })
          )}
          {circles.map((c) => (
            <circle
              key={c.id}
              cx={c.cx}
              cy={c.cy}
              r={c.rad}
              fill={c.fill}
              stroke={c.stroke}
              strokeWidth={c.strokeWidth}
            >{c.message}</circle>
          ))}
            {circles.map((c) => (
            <text
              key={`text-${c.id}`}
              x={c.cx}
              y={c.cy}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="12px"
              pointerEvents="none"
            >{c.message}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}