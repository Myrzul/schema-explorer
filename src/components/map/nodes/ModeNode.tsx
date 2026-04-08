'use client';

import { Handle, Position } from '@xyflow/react';
import type { SchemaMode } from '@/types';
import { modeCategoryColors } from '@/lib/colors';

interface ModeNodeProps {
  data: SchemaMode & { nodeType: string };
}

export default function ModeNode({ data }: ModeNodeProps) {
  const colors = modeCategoryColors[data.category];

  return (
    <div
      className="rounded-full px-4 py-2 shadow-sm text-center min-w-[120px]"
      style={{
        backgroundColor: colors.bg,
        border: `2px solid ${colors.border}`,
        color: colors.text,
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-gray-400" />
      <div className="text-xs font-medium leading-tight">{data.name}</div>
      <Handle type="source" position={Position.Bottom} className="!bg-gray-400" />
    </div>
  );
}
