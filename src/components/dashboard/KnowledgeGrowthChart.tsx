import React, { useState } from 'react';
import { KnowledgeGrowthPoint } from '../../types';
import './Dashboard.css';

interface KnowledgeGrowthChartProps {
  growthData: KnowledgeGrowthPoint[];
}

export const KnowledgeGrowthChart: React.FC<KnowledgeGrowthChartProps> = ({ growthData }) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  if (!growthData || growthData.length === 0) return null;

  const width = 620;
  const height = 180;
  const padX = 30;
  const padY = 20;

  const minChunks = Math.min(...growthData.map((d) => d.chunks)) * 0.9;
  const maxChunks = Math.max(...growthData.map((d) => d.chunks)) * 1.05;

  const minDocs = Math.min(...growthData.map((d) => d.documents)) * 0.9;
  const maxDocs = Math.max(...growthData.map((d) => d.documents)) * 1.05;

  // Map coordinates
  const points = growthData.map((d, i) => {
    const x = padX + (i / (growthData.length - 1)) * (width - padX * 2);
    const yChunks =
      height - padY - ((d.chunks - minChunks) / (maxChunks - minChunks)) * (height - padY * 2);
    const yDocs =
      height - padY - ((d.documents - minDocs) / (maxDocs - minDocs)) * (height - padY * 2);
    return { ...d, x, yChunks, yDocs };
  });

  const chunksLine = points.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x},${pt.yChunks}`).join(' ');
  const chunksArea = `${chunksLine} L ${points[points.length - 1].x},${height - padY} L ${points[0].x},${height - padY} Z`;

  const docsLine = points.map((pt, i) => `${i === 0 ? 'M' : 'L'} ${pt.x},${pt.yDocs}`).join(' ');

  const activeIndex = hoverIndex !== null ? hoverIndex : points.length - 1;
  const activePt = points[activeIndex];

  return (
    <div className="growth-card">
      <div className="card-header-clean">
        <div>
          <div className="card-title-main">Knowledge Growth</div>
          <div className="card-subtitle-sub">
            Knowledge chunks and indexed documents over the last 30 days
          </div>
        </div>

        <div className="growth-legend">
          <div className="growth-legend-item">
            <span className="legend-swatch" style={{ background: 'var(--text-primary)' }} />
            <span>Chunks</span>
          </div>
          <div className="growth-legend-item">
            <span className="legend-swatch" style={{ background: '#2563EB' }} />
            <span>Documents</span>
          </div>
        </div>
      </div>

      <div className="chart-svg-container">
        <div style={{ position: 'relative', width: '100%', height: 160 }}>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="chunksGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#090D14" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#090D14" stopOpacity="0.00" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0.2, 0.5, 0.8].map((f, idx) => {
              const y = padY + f * (height - padY * 2);
              return (
                <line
                  key={idx}
                  x1={padX}
                  y1={y}
                  x2={width - padX}
                  y2={y}
                  stroke="var(--border)"
                  strokeDasharray="3 3"
                />
              );
            })}

            {/* Chunks Area */}
            <path d={chunksArea} fill="url(#chunksGradient)" />

            {/* Chunks Line */}
            <path
              d={chunksLine}
              fill="none"
              stroke="var(--text-primary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Documents Line */}
            <path
              d={docsLine}
              fill="none"
              stroke="#2563EB"
              strokeWidth="1.75"
              strokeDasharray="4 3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Active Vertical Crosshair */}
            <line
              x1={activePt.x}
              y1={padY}
              x2={activePt.x}
              y2={height - padY}
              stroke="var(--border-strong)"
              strokeWidth="1"
            />

            {/* Interactive Points */}
            {points.map((pt, idx) => (
              <g
                key={pt.date}
                onMouseEnter={() => setHoverIndex(idx)}
                onMouseLeave={() => setHoverIndex(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Transparent hit area */}
                <rect
                  x={pt.x - 15}
                  y={0}
                  width={30}
                  height={height}
                  fill="transparent"
                />
                {/* Chunks dot */}
                <circle
                  cx={pt.x}
                  cy={pt.yChunks}
                  r={idx === activeIndex ? 4.5 : 2.5}
                  fill={idx === activeIndex ? 'var(--text-primary)' : 'var(--surface)'}
                  stroke="var(--text-primary)"
                  strokeWidth="2"
                  style={{ transition: 'all 0.12s ease' }}
                />
                {/* Docs dot */}
                <circle
                  cx={pt.x}
                  cy={pt.yDocs}
                  r={idx === activeIndex ? 4 : 2}
                  fill={idx === activeIndex ? '#2563EB' : 'var(--surface)'}
                  stroke="#2563EB"
                  strokeWidth="1.5"
                />
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Integrated Bottom Statistics Strip */}
      <div className="chart-strip-metrics">
        <div className="chart-strip-item">
          <div className="chart-strip-val">{activePt.chunks.toLocaleString()}</div>
          <div className="chart-strip-lbl">Vector Chunks ({activePt.label})</div>
        </div>
        <div className="chart-strip-item">
          <div className="chart-strip-val">{activePt.documents.toLocaleString()}</div>
          <div className="chart-strip-lbl">Indexed Docs</div>
        </div>
        <div className="chart-strip-item">
          <div className="chart-strip-val">+6.5 / doc</div>
          <div className="chart-strip-lbl">Avg Chunk Ratio</div>
        </div>
      </div>
    </div>
  );
};
