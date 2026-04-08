'use client';

import { Handle, Position } from '@xyflow/react';
import type { Schema } from '@/types';
import { domainColors } from '@/lib/colors';

interface SchemaNodeProps {
  data: Schema & { nodeType: string };
}

export default function SchemaNode({ data }: SchemaNodeProps) {
  const colors = domainColors[data.domainId];
  const isConditionnel = data.type === 'conditionnel';

  return (
    <div
      className="min-w-[180px] rounded-lg px-3 py-2 shadow-sm text-center relative"
      style={{
        backgroundColor: colors.bg,
        border: `2px ${isConditionnel ? 'dashed' : 'solid'} ${colors.border}`,
        color: colors.text,
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-gray-400" />

      <span
        className="absolute top-1 right-1 text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center"
        style={{
          backgroundColor: colors.border,
          color: '#fff',
        }}
      >
        {isConditionnel ? 'C' : 'I'}
      </span>

      <div className="text-xs font-bold">{data.code}</div>
      <div className="text-[11px] leading-tight mt-0.5">{data.name}</div>

      <Handle type="source" position={Position.Bottom} className="!bg-gray-400" />
    </div>
  );
}
