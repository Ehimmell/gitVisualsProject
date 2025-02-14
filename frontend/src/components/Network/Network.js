import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import * as d3 from 'd3'
import Node from './Node'
import RepoTreeAPIHandler from './TreeAPIHandler'
import Loading from '../Loading/Loading'
import CommitInfoSheet from "../CommitInfoSheet/CommitInfoSheet"
import './Network.css'
import Leaf from "../Leaf/Leaf"

export default function Network({ owner, repo }) {
  const [circles, setCircles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [commit, setCommit] = useState(null)
  const rad = 50
  const svgRef = useRef(null)
  const gRef = useRef(null)

  const zoomBehavior = useMemo(
    () =>
      d3
        .zoom()
        .scaleExtent([0.1, 5])
        .on('zoom', e => {
          if (gRef.current) d3.select(gRef.current).attr('transform', e.transform)
        }),
    []
  )

  const createComponents = useCallback(() => {
    const x = Math.random() * (rad * 2) - rad
    const y = Math.sqrt(rad * rad - x * x) * (Math.random() < 0.5 ? -1 : 1)
    return [x, y]
  }, [rad])

  useEffect(() => {
    if (svgRef.current) d3.select(svgRef.current).call(zoomBehavior)
    return () => {
      if (svgRef.current) d3.select(svgRef.current).on('.zoom', null)
    }
  }, [zoomBehavior, circles])

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const data = await RepoTreeAPIHandler(owner, repo)
        const map = new Map()
        data.forEach((d, i) => map.set(d[0], i))
        const result = data
          .map((d, i) => {
            if (!Array.isArray(d) || d.length < 6) return null
            return new Node(
              i,
              d[0],
              d[1].length < 13 ? d[1] : d[1].slice(0, 13) + '...',
              (d[2] + 1) * rad * 4,
              (d[4] - d[3] + 1) * rad * 4,
              rad,
              'url(#shinyGray)',
              '#999999',
              4,
              d[5].map(p => map.get(p)),
              createComponents()
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
  }, [owner, repo, createComponents])

  const handleClick = sha => {
    setCommit(sha)
  }

  if (loading) return <Loading />
  if (error) return <div>{error}</div>

  return (
    <div className="background">
      <svg
        ref={svgRef}
        width="100%"
        height="100vh"
        style={{ touchAction: 'none' }}
        className="graph-container"
      >
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="75%" stopColor="lightpink" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
        </defs>
        <g ref={gRef}>
          {circles.map(c => (
            <g key={`${c.id}-leaf`}>
              <Leaf
                start={{
                  x: c.cx + c.branchComponents[0] * 1.3,
                  y: c.cy + c.branchComponents[1] * 1.3,
                }}
                end={{
                  x: c.cx + c.branchComponents[0] * 2.5,
                  y: c.cy + c.branchComponents[1] * 2.5,
                }}
                type="node"
              />
            </g>
          ))}
          {circles.map(c => (
            <g key={`${c.id}-leafBranch`}>
              <line
                x1={c.cx + c.branchComponents[0]}
                y1={c.cy + c.branchComponents[1]}
                x2={c.cx + c.branchComponents[0] * 1.3}
                y2={c.cy + c.branchComponents[1] * 1.3}
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth={4}
              />
            </g>
          ))}
          {circles.flatMap((s, sIndex) =>
            s.connections.map((ti, i) => {
              const t = circles[ti]
              if (!t) return null
              return (
                <line
                  key={`line-${sIndex}-${i}`}
                  x1={s.cx}
                  y1={s.cy}
                  x2={t.cx}
                  y2={t.cy}
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth={2}
                />
              )
            })
          )}
          {circles.map(c => (
            <g
              key={`node-${c.id}`}
              className="node"
            >
              <circle
                className="node-circle"
                cx={c.cx}
                cy={c.cy}
                r={c.rad}
                fill="black"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth={4}
                onClick={() => handleClick(c.sha)}
                style={{ cursor: 'pointer' }}
              />
              <circle
                className="node-circle"
                cx={c.cx}
                cy={c.cy}
                r={c.rad}
                fill="black"
                style={{ pointerEvents: 'none' }}
              />
              <text
                x={c.cx}
                y={c.cy}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255, 255, 255, 0.6)"
                fontSize="12px"
                tabIndex="0"
                role="button"
                aria-label={`Commit ${c.message}`}
              >
                {c.message}
              </text>
            </g>
          ))}
        </g>
      </svg>
      {commit && (
        <div className="commit-container">
          <div className="commit">
            <CommitInfoSheet
              onSendData={() => setCommit(null)}
              owner={owner}
              repo={repo}
              sha={commit}
            />
          </div>
        </div>
      )}
    </div>
  )
}