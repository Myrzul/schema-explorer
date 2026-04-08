'use client';

import {
  forceSimulation,
  forceLink,
  forceManyBody,
  forceCenter,
  forceCollide,
  forceX,
  forceY,
} from 'd3-force';
import { useEffect, useState } from 'react';
import type { Node, Edge } from '@xyflow/react';

// ---------------------------------------------------------------------------
// Domain-based grouping targets
// ---------------------------------------------------------------------------

const DOMAIN_POSITIONS: Record<string, { x: number; y: number }> = {
  'separation-rejet': { x: -600, y: -400 },
  'manque-autonomie': { x: 600, y: -400 },
  'manque-limites': { x: 0, y: 0 },
  'orientation-autres': { x: -600, y: 400 },
  'survigilance-inhibition': { x: 600, y: 400 },
};

/** Resolve a target position for a node based on its type / domain. */
function getGroupTarget(node: Node): { x: number; y: number } {
  const nodeType = node.data?.nodeType as string | undefined;

  if (nodeType === 'schemaNode') {
    const domainId = (node.data as Record<string, unknown>)?.domainId as
      | string
      | undefined;
    if (domainId && DOMAIN_POSITIONS[domainId]) {
      return DOMAIN_POSITIONS[domainId];
    }
  }

  if (nodeType === 'domainNode') {
    if (DOMAIN_POSITIONS[node.id]) {
      return DOMAIN_POSITIONS[node.id];
    }
  }

  if (nodeType === 'modeNode') return { x: 0, y: 0 };
  if (nodeType === 'disorderNode') return { x: 0, y: 600 };

  return { x: 0, y: -600 };
}

// ---------------------------------------------------------------------------
// Link distance by relationship type
// ---------------------------------------------------------------------------

function linkDistance(edge: Edge): number {
  const relType = (edge.data as Record<string, unknown>)?.relationshipType as
    | string
    | undefined;
  if (relType === 'activates_mode') return 180;
  if (relType === 'derives_from') return 250;
  return 200;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useMapLayout(
  nodes: Node[],
  edges: Edge[],
): { layoutNodes: Node[]; isReady: boolean } {
  const [layoutNodes, setLayoutNodes] = useState<Node[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (nodes.length === 0) {
      setLayoutNodes([]);
      setIsReady(true);
      return;
    }

    // Create mutable simulation nodes (d3 mutates these in place)
    const simNodes = nodes.map((n) => ({
      ...n,
      x: n.position.x,
      y: n.position.y,
    }));

    // Build an id -> index map for the link force
    const idToIndex = new Map<string, number>();
    simNodes.forEach((n, i) => idToIndex.set(n.id, i));

    const simLinks = edges
      .filter(
        (e) => idToIndex.has(e.source as string) && idToIndex.has(e.target as string),
      )
      .map((e) => ({
        source: idToIndex.get(e.source as string)!,
        target: idToIndex.get(e.target as string)!,
        _edge: e,
      }));

    const simulation = forceSimulation(simNodes as any)
      .force(
        'link',
        forceLink(simLinks as any).distance((d: any) => linkDistance(d._edge)),
      )
      .force('charge', forceManyBody().strength(-400))
      .force('center', forceCenter(0, 0))
      .force('collide', forceCollide().radius(80))
      .force(
        'groupX',
        forceX<any>((d: any) => getGroupTarget(d).x).strength(0.1),
      )
      .force(
        'groupY',
        forceY<any>((d: any) => getGroupTarget(d).y).strength(0.1),
      )
      .stop();

    // Run synchronously
    for (let i = 0; i < 300; i++) {
      simulation.tick();
    }

    const positioned = simNodes.map((sn) => ({
      ...nodes.find((n) => n.id === sn.id)!,
      position: { x: (sn as any).x ?? 0, y: (sn as any).y ?? 0 },
    }));

    setLayoutNodes(positioned);
    setIsReady(true);
  }, [nodes, edges]);

  return { layoutNodes, isReady };
}
