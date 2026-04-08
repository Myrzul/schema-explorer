'use client';

import { Handle, Position } from '@xyflow/react';
import type { PersonalityDisorder } from '@/types';
import { nodeTypeColors } from '@/lib/colors';

interface DisorderNodeProps {
  data: PersonalityDisorder & { nodeType: string };
}

export default function DisorderNode({ data }: DisorderNodeProps) {
  const colors = nodeTypeColors.disorder;
  const shortName = data.name.replace(/Trouble de la [Pp]ersonnalité\s*/i, '').replace(/Trouble de [Pp]ersonnalité\s*/i, '');

  return (
    <div
      className="rounded-lg px-3 py-2 shadow-sm text-center min-w-[130px]"
      style={{
        backgroundColor: colors.bg,
        border: `3px double ${colors.border}`,
        color: colors.text,
      }}
    >
      <Handle type="target" position={Position.Top} className="!bg-gray-400" />
      <div className="text-xs font-semibold leading-tight">{shortName || data.name}</div>
      <Handle type="source" position={Position.Bottom} className="!bg-gray-400" />
    </div>
  );
}
