'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { domainColors, nodeTypeColors } from '@/lib/colors';
import { domains } from '@/data';
import type { GraphNodeType } from '@/types';

const NODE_SHAPE_LABELS: { type: GraphNodeType; label: string; shape: string }[] = [
  { type: 'schema', label: 'Schema', shape: 'rectangle' },
  { type: 'mode', label: 'Mode', shape: 'ellipse' },
  { type: 'domain', label: 'Domaine', shape: 'rectangle large' },
  { type: 'coping-style', label: 'Style de coping', shape: 'hexagone' },
  { type: 'disorder', label: 'Trouble', shape: 'double bordure' },
  { type: 'need', label: 'Besoin', shape: 'losange' },
  { type: 'technique', label: 'Technique', shape: 'cercle' },
];

export default function MapLegend() {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute bottom-4 left-4 z-10">
      <div className="rounded-xl bg-white/90 backdrop-blur shadow-md border border-gray-200 overflow-hidden">
        {/* Toggle header */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-gray-600 hover:bg-gray-50 w-full transition-colors"
        >
          Legende
          {open ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
        </button>

        {open && (
          <div className="px-3 pb-3 space-y-3">
            {/* Domain colours */}
            <div>
              <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Domaines
              </div>
              <div className="space-y-0.5">
                {domains.map((d) => {
                  const c = domainColors[d.id];
                  return (
                    <div key={d.id} className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-sm border shrink-0"
                        style={{ backgroundColor: c.bg, borderColor: c.border }}
                      />
                      <span className="text-[10px] text-gray-600">{d.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Node types */}
            <div>
              <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Types de noeuds
              </div>
              <div className="space-y-0.5">
                {NODE_SHAPE_LABELS.map(({ type, label, shape }) => {
                  const c = nodeTypeColors[type];
                  return (
                    <div key={type} className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 shrink-0 border"
                        style={{
                          backgroundColor: c.bg,
                          borderColor: c.border,
                          borderRadius:
                            type === 'mode' || type === 'technique'
                              ? '50%'
                              : type === 'coping-style'
                                ? '6px'
                                : '2px',
                          borderWidth: type === 'disorder' ? '2px' : '1px',
                          borderStyle: type === 'disorder' ? 'double' : 'solid',
                        }}
                      />
                      <span className="text-[10px] text-gray-600">
                        {label}{' '}
                        <span className="text-gray-400">({shape})</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Schema type legend */}
            <div>
              <div className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                Type de schema
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm border-2 border-solid border-gray-400 bg-gray-100 shrink-0" />
                  <span className="text-[10px] text-gray-600">Inconditionnel (trait plein)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm border-2 border-dashed border-gray-400 bg-gray-100 shrink-0" />
                  <span className="text-[10px] text-gray-600">Conditionnel (pointille)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
