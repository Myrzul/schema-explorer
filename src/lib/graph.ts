import {
  schemas,
  modes,
  domains,
  needs,
  copingStyles,
  disorders,
  techniques,
  relationships,
} from '@/data';

import type { Node, Edge } from '@xyflow/react';

// ---------------------------------------------------------------------------
// Edge stroke colours keyed by relationship type
// ---------------------------------------------------------------------------
const EDGE_COLORS: Record<string, string> = {
  belongs_to_domain: '#D1D5DB',
  activates_mode: '#60A5FA',
  derives_from: '#F97316',
  characterizes_disorder: '#EF4444',
  coping_style_maps_mode: '#A78BFA',
  need_unmet_by_domain: '#34D399',
  technique_targets: '#D946EF',
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Map an entity list to React Flow nodes. */
function entitiesToNodes<T extends { id: string }>(
  entities: T[],
  nodeType: string,
): Node[] {
  return entities.map((entity) => ({
    id: entity.id,
    type: nodeType,
    data: { ...entity, nodeType },
    position: { x: 0, y: 0 },
  }));
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function buildGraphData(): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [
    ...entitiesToNodes(schemas, 'schemaNode'),
    ...entitiesToNodes(modes, 'modeNode'),
    ...entitiesToNodes(domains, 'domainNode'),
    ...entitiesToNodes(copingStyles, 'copingStyleNode'),
    ...entitiesToNodes(disorders, 'disorderNode'),
    ...entitiesToNodes(needs, 'needNode'),
    ...entitiesToNodes(techniques, 'techniqueNode'),
  ];

  const edges: Edge[] = relationships.map((rel) => ({
    id: rel.id,
    source: rel.sourceId,
    target: rel.targetId,
    type: 'typedEdge',
    data: {
      label: rel.label,
      relationshipType: rel.type,
    },
    animated: rel.type === 'derives_from',
    style: {
      stroke: EDGE_COLORS[rel.type] ?? '#94A3B8',
    },
  }));

  return { nodes, edges };
}
