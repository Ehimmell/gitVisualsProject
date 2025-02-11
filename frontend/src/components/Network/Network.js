import React, {useEffect, useRef, useState} from 'react'
import * as d3 from 'd3'
import Node from './/Node';
import RepoTreeAPIHandler from './TreeAPIHandler'
import Loading from '../Loading/Loading'
import CommitInfoSheet from "../CommitInfoSheet/CommitInfoSheet";
import './Network.css'

export default function Network(props) {
    const [circles, setCircles] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [commit, setCommit] = useState(null);
    const rad = 50
    const svgRef = useRef(null)
    const gRef = useRef(null)

    const zoomBehavior = d3.zoom()
        .scaleExtent([0.1, 5])
        .on('zoom', e => {
            if (gRef.current) d3.select(gRef.current).attr('transform', e.transform)
        })

    const handleCommitData = (data) => {
        setCommit(null);
    }

    const createComponents = (rad) => {
        const xComponent = Math.random() * (rad * 2) - rad;
        const yComponent = Math.sqrt(rad ** 2 - xComponent ** 2) * (Math.random() < 0.5 ? -1 : 1);

        return [xComponent, yComponent];
    }

    useEffect(() => {
        ;(async () => {
            try {
                setLoading(true)
                const data = await RepoTreeAPIHandler(props.owner, props.repo)
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
                            '#A9A9A9',
                            4,
                            d[5].map(p => map.get(p)),
                            createComponents(rad)
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
    }, [props.owner, props.repo])

    useEffect(() => {
        if (svgRef.current) d3.select(svgRef.current).call(zoomBehavior)
        return () => {
            if (svgRef.current) d3.select(svgRef.current).on('.zoom', null)
        }
    }, [zoomBehavior, circles])

    const handleClick = (sha) => {
        setCommit(sha);
        console.log(sha);
    }

    if (loading) return <Loading/>
    if (error) return <div>{error}</div>

    return (
        <div>
            <svg ref={svgRef} width="100%" height="100vh" style={{touchAction: 'none'}} className={'graph-container'}>
                <defs>
                    <linearGradient id="shinyGray" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#555"/>
                        <stop offset="50%" stopColor="#777"/>
                        <stop offset="100%" stopColor="#333"/>
                    </linearGradient>
                    <linearGradient id="animatedShine" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(255,255,255,0.6)"/>
                        <stop offset="50%" stopColor="rgba(255,255,255,0)"/>
                        <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                    </linearGradient>
                </defs>
                <g ref={gRef}>
                    {circles.map(
                        c => (
                        <g key={`${c.id}-leafBranch`}>
                            <line
                                x1={c.cx+c.branchComponents[0]}
                                y1={c.cy+c.branchComponents[1]}
                                x2={c.cx+(c.branchComponents[0]*1.5)}
                                y2={c.cy+(c.branchComponents[1]*1.5)}
                                stroke="#A9A9A9"
                                strokeWidth={2}
                            >
                            </line>
                        </g>
                    ))}
                    {circles.map((s, sIndex) =>
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
                            style={{cursor: 'pointer', border:'none'}}
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
          {
                    commit == null ? null :
                        <div className={'commit-container'}>
                            <div className={'commit'}>
                                <CommitInfoSheet onSendData={handleCommitData} owner={props.owner} repo={props.repo} sha={commit}></CommitInfoSheet>
                            </div>
                        </div>
                }
        </div>
    )
}