'use client';

import { Handle, Position } from '@xyflow/react';
import type { EmotionalNeed } from '@/types';
import { nodeTypeColors } from '@/lib/colors';

interface NeedNodeProps {
  data: EmotionalNeed & { nodeType: string };
}

export default function NeedNode({ data }: NeedNodeProps) {
  const colors = nodeTypeColors.need;
  const displayName = data.name.length > 30 ? data.name.slice(0, 28) + '\u2026' : data.name;

  return (
    <div
      className="rounded-lg px-3 py-2 shadow-sm text-center min-w-[120px] max-w-[180px]"
      style={{
        backgroundColor: colors.bg,
        border: `2px solid ${colors.border}`,
        color: colors.text,
      }}
    >
      <Handle type="target" position={Position.Left} className="!bg-gray-400" />
      <div className="text-xs font-medium leading-tight">{displayName}</div>
      <Handle type="source" position={Position.Right} className="!bg-gray-400" />
    </div>
  );
}
