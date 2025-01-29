import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import Node from './/Node';
import RepoTreeAPIHandler from './TreeAPIHandler'
import Loading from '../Loading/Loading'

export default function Network({ owner, repo }) {
  const [circles, setCircles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const rad = 50
  const svgRef = useRef(null)
  const gRef = useRef(null)

  const zoomBehavior = d3.zoom()
    .scaleExtent([0.1, 5])
    .on('zoom', e => {
      if (gRef.current) d3.select(gRef.current).attr('transform', e.transform)
    })

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const data = await RepoTreeAPIHandler(owner, repo)
        const map = new Map()
        data.forEach((d, i) => map.set(d[0], i))
        const result = data
          .map(d => {
            if (!Array.isArray(d) || d.length < 6) return null
            return new Node(
              map.get(d[0]) || 0,
              d[0],
              d[1].length < 13 ? d[1] : d[1].slice(0, 13) + '...',
              (d[2] + 1) * rad * 4,
              (d[4] - d[3] + 1) * rad * 4,
              rad,
              'url(#shinyGray)',
              '#A9A9A9',
              4,
              d[5].map(p => map.get(p)),
              d[6]
            )
          })
          .filter(Boolean)
        setCircles(result)
        setLoading(false)
      } catch {
        setError('Failed to load data.')
        setLoading(false)
      }
    })()
  }, [owner, repo])

  useEffect(() => {
    if (svgRef.current) d3.select(svgRef.current).call(zoomBehavior)
    return () => {
      if (svgRef.current) d3.select(svgRef.current).on('.zoom', null)
    }
  }, [zoomBehavior, circles])

  const handleClick = (sha) => {
    console.log(`Clicked on SHA: ${sha}`)
  }

  if (loading) return <Loading />
  if (error) return <div>{error}</div>

  return (
    <div>
      <svg ref={svgRef} width="100%" height="100vh" style={{ touchAction: 'none' }}>
        <defs>
          <linearGradient id="shinyGray" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#555" />
            <stop offset="50%" stopColor="#777" />
            <stop offset="100%" stopColor="#333" />
          </linearGradient>
          <linearGradient id="animatedShine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        <g ref={gRef}>
          {circles.map(s =>
            s.connections.map(ti => {
              const t = circles[ti]
              if (!t) return null
              return (
                <line
                  key={`${s.id}-to-${t.id}`}
                  x1={s.cx}
                  y1={s.cy}
                  x2={t.cx}
                  y2={t.cy}
                  stroke="white"
                  strokeWidth={2}
                />
              )
            })
          )}
          {circles.map(c => (
            <g key={`group-${c.id}`}>
              <circle
                cx={c.cx}
                cy={c.cy}
                r={c.rad}
                fill="url(#shinyGray)"
                stroke={c.stroke}
                strokeWidth={c.strokeWidth}
              />
              <circle
                cx={c.cx}
                cy={c.cy}
                r={c.rad}
                fill="url(#animatedShine)"
              />
            </g>
          ))}
          {circles.map(c => (
            <text
              key={`text-${c.id}`}
              x={c.cx}
              y={c.cy}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize="12px"
              style={{ cursor: 'pointer' }}
              onClick={() => handleClick(c.sha)}
              tabIndex="0"
              role="button"
              aria-label={`Commit ${c.message}`}
            >
              {c.message}
            </text>
          ))}
        </g>
      </svg>
    </div>
  )
}