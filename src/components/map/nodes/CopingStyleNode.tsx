'use client';

import { Handle, Position } from '@xyflow/react';
import type { CopingStyle } from '@/types';
import { nodeTypeColors } from '@/lib/colors';

interface CopingStyleNodeProps {
  data: CopingStyle & { nodeType: string };
}

export default function CopingStyleNode({ data }: CopingStyleNodeProps) {
  const colors = nodeTypeColors['coping-style'];

  return (
    <div
      className="rounded-2xl px-4 py-2.5 shadow-sm text-center min-w-[140px]"
      style={{
        backgroundColor: colors.bg,
        border: `2px solid ${colors.border}`,
        color: colors.text,
        clipPath: 'polygon(15% 0%, 85% 0%, 100% 50%, 85% 100%, 15% 100%, 0% 50%)',
        padding: '12px 28px',
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-gray-400" />
      <div className="text-xs font-bold">{data.name}</div>
      <div className="text-[10px] mt-0.5 opacity-75 italic">{data.metaphor}</div>
      <Handle type="source" position={Position.Bottom} className="!bg-gray-400" />
    </div>
  );
}
