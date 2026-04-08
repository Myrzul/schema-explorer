'use client';

import { getBezierPath, type EdgeProps } from '@xyflow/react';

interface TypedEdgeData {
  label?: string;
  relationshipType?: string;
}

export default function TypedEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  selected,
}: EdgeProps & { data?: TypedEdgeData }) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const isSelected = selected;

  return (
    <>
      <path
        id={id}
        className={`react-flow__edge-path ${isSelected ? 'selected-edge' : ''}`}
        d={edgePath}
        style={{
          ...style,
          opacity: isSelected ? 1 : 0.4,
          strokeWidth: isSelected ? 2 : 1,
          fill: 'none',
          transition: 'opacity 0.2s, stroke-width 0.2s',
        }}
      />
      {data?.label && (
        <foreignObject
          x={labelX - 50}
          y={labelY - 10}
          width={100}
          height={20}
          className="pointer-events-none"
          style={{ overflow: 'visible' }}
        >
          <div
            className="flex items-center justify-center"
            style={{
              opacity: isSelected ? 1 : 0,
              transition: 'opacity 0.2s',
            }}
          >
            <span className="text-[9px] text-gray-500 bg-white/80 px-1 rounded whitespace-nowrap">
              {data.label}
            </span>
          </div>
        </foreignObject>
      )}
    </>
  );
}
