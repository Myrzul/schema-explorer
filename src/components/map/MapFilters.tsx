'use client';

import { useCallback } from 'react';
import type { DomainId, GraphNodeType } from '@/types';
import { domains } from '@/data';
import { domainColors, nodeTypeColors } from '@/lib/colors';

// ---- Filter state shape (owned by parent) ----
export interface MapFilterState {
  domains: Set<DomainId>;
  showConditional: boolean;
  showInconditional: boolean;
  nodeTypes: Set<GraphNodeType>;
}

export function defaultFilters(): MapFilterState {
  return {
    domains: new Set<DomainId>(domains.map((d) => d.id)),
    showConditional: true,
    showInconditional: true,
    nodeTypes: new Set<GraphNodeType>([
      'schema',
      'mode',
      'domain',
      'coping-style',
      'disorder',
      'need',
      'technique',
    ]),
  };
}

// ---- Labels for node-type toggles ----
const NODE_TYPE_LABELS: { type: GraphNodeType; label: string }[] = [
  { type: 'schema', label: 'Schemas' },
  { type: 'mode', label: 'Modes' },
  { type: 'coping-style', label: 'Styles' },
  { type: 'disorder', label: 'Troubles' },
  { type: 'need', label: 'Besoins' },
  { type: 'technique', label: 'Techniques' },
];

interface MapFiltersProps {
  filters: MapFilterState;
  onChange: (next: MapFilterState) => void;
}

export default function MapFilters({ filters, onChange }: MapFiltersProps) {
  const toggleDomain = useCallback(
    (id: DomainId) => {
      const next = new Set(filters.domains);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      onChange({ ...filters, domains: next });
    },
    [filters, onChange],
  );

  const toggleNodeType = useCallback(
    (t: GraphNodeType) => {
      const next = new Set(filters.nodeTypes);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      onChange({ ...filters, nodeTypes: next });
    },
    [filters, onChange],
  );

  return (
    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 flex flex-wrap items-center gap-2 rounded-xl bg-white/90 backdrop-blur px-4 py-2 shadow-md border border-gray-200 max-w-[95vw]">
      {/* Domain toggles */}
      <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mr-1">
        Domaines
      </span>
      {domains.map((d) => {
        const active = filters.domains.has(d.id);
        const c = domainColors[d.id];
        return (
          <button
            key={d.id}
            onClick={() => toggleDomain(d.id)}
            className="rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-all border"
            style={{
              backgroundColor: active ? c.bg : 'transparent',
              borderColor: active ? c.border : '#D1D5DB',
              color: active ? c.text : '#9CA3AF',
              opacity: active ? 1 : 0.5,
            }}
          >
            {d.name}
          </button>
        );
      })}

      {/* Separator */}
      <div className="w-px h-5 bg-gray-300 mx-1" />

      {/* Conditionnel / Inconditionnel */}
      <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mr-1">
        Type
      </span>
      <button
        onClick={() =>
          onChange({ ...filters, showInconditional: !filters.showInconditional })
        }
        className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium border transition-all ${
          filters.showInconditional
            ? 'bg-gray-800 text-white border-gray-800'
            : 'bg-transparent text-gray-400 border-gray-300 opacity-50'
        }`}
      >
        Inconditionnel
      </button>
      <button
        onClick={() =>
          onChange({ ...filters, showConditional: !filters.showConditional })
        }
        className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium border border-dashed transition-all ${
          filters.showConditional
            ? 'bg-gray-700 text-white border-gray-700'
            : 'bg-transparent text-gray-400 border-gray-300 opacity-50'
        }`}
      >
        Conditionnel
      </button>

      {/* Separator */}
      <div className="w-px h-5 bg-gray-300 mx-1" />

      {/* Node type toggles */}
      <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mr-1">
        Entites
      </span>
      {NODE_TYPE_LABELS.map(({ type, label }) => {
        const active = filters.nodeTypes.has(type);
        const c = nodeTypeColors[type];
        return (
          <button
            key={type}
            onClick={() => toggleNodeType(type)}
            className="rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-all border"
            style={{
              backgroundColor: active ? c.bg : 'transparent',
              borderColor: active ? c.border : '#D1D5DB',
              color: active ? c.text : '#9CA3AF',
              opacity: active ? 1 : 0.5,
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
