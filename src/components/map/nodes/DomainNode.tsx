'use client';

import { Handle, Position } from '@xyflow/react';
import type { Domain } from '@/types';
import { domainColors } from '@/lib/colors';

const romanNumerals = ['I', 'II', 'III', 'IV', 'V'];

interface DomainNodeProps {
  data: Domain & { nodeType: string };
}

export default function DomainNode({ data }: DomainNodeProps) {
  const colors = domainColors[data.id];
  const roman = romanNumerals[data.number - 1] ?? String(data.number);

  return (
    <div
      className="rounded-xl px-6 py-4 shadow-sm text-center min-w-[220px]"
      style={{
        backgroundColor: colors.bgLight,
        border: `2px solid ${colors.border}`,
        color: colors.text,
      }}
    >
      <Handle type="target" position={Position.Left} className="!bg-gray-400" />
      <div className="text-base font-bold leading-snug">
        {roman}. {data.name}
      </div>
      <Handle type="source" position={Position.Right} className="!bg-gray-400" />
    </div>
  );
}
