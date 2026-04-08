'use client';

import { useCallback, useMemo, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeMouseHandler,
} from '@xyflow/react';

import { nodeTypes } from '@/components/map/nodes';
import { edgeTypes } from '@/components/map/edges';
import { buildGraphData } from '@/lib/graph';
import { useMapLayout } from '@/components/map/useMapLayout';
import MapFilters, {
  defaultFilters,
  type MapFilterState,
} from '@/components/map/MapFilters';
import MapLegend from '@/components/map/MapLegend';
import Sidebar from '@/components/layout/Sidebar';
import type { DomainId, GraphNodeType } from '@/types';

// ---------------------------------------------------------------------------
// Node-type mapping (React Flow type string -> GraphNodeType)
// ---------------------------------------------------------------------------

const RF_TYPE_TO_GRAPH: Record<string, GraphNodeType> = {
  schemaNode: 'schema',
  modeNode: 'mode',
  domainNode: 'domain',
  copingStyleNode: 'coping-style',
  disorderNode: 'disorder',
  needNode: 'need',
  techniqueNode: 'technique',
};

// ---------------------------------------------------------------------------
// BFS helper: collect node ids within `maxHops` of `startId`
// ---------------------------------------------------------------------------

function bfsConnected(
  startId: string,
  edges: Edge[],
  maxHops: number,
): Set<string> {
  const visited = new Set<string>();
  let frontier = [startId];
  visited.add(startId);

  for (let hop = 0; hop < maxHops && frontier.length > 0; hop++) {
    const next: string[] = [];
    for (const id of frontier) {
      for (const e of edges) {
        const src = typeof e.source === 'string' ? e.source : (e.source as any)?.id;
        const tgt = typeof e.target === 'string' ? e.target : (e.target as any)?.id;
        if (src === id && !visited.has(tgt)) {
          visited.add(tgt);
          next.push(tgt);
        }
        if (tgt === id && !visited.has(src)) {
          visited.add(src);
          next.push(src);
        }
      }
    }
    frontier = next;
  }

  return visited;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function InteractiveMap() {
  // --- Raw graph data (stable across renders) ---
  const { nodes: rawNodes, edges: rawEdges } = useMemo(() => buildGraphData(), []);

  // --- Layout (d3-force) ---
  const { layoutNodes, isReady } = useMapLayout(rawNodes, rawEdges);

  // --- React Flow state ---
  const [nodes, setNodes, onNodesChange] = useNodesState([] as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(rawEdges);

  // Sync layout -> state once layout is ready
  const [layoutApplied, setLayoutApplied] = useState(false);
  if (isReady && !layoutApplied && layoutNodes.length > 0) {
    setNodes(layoutNodes);
    setLayoutApplied(true);
  }

  // --- Selection ---
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // --- Filters ---
  const [filters, setFilters] = useState<MapFilterState>(defaultFilters);

  // --- Derive the selected node object ---
  const selectedNode = useMemo(
    () => (selectedNodeId ? nodes.find((n) => n.id === selectedNodeId) ?? null : null),
    [selectedNodeId, nodes],
  );

  // --- On node click: highlight neighbourhood ---
  const onNodeClick: NodeMouseHandler = useCallback(
    (_event, node) => {
      setSelectedNodeId(node.id);
      const connected = bfsConnected(node.id, rawEdges, 2);

      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          style: {
            ...n.style,
            opacity: connected.has(n.id) ? 1 : 0.15,
            transition: 'opacity 0.25s ease',
          },
        })),
      );

      setEdges((prev) =>
        prev.map((e) => {
          const src = typeof e.source === 'string' ? e.source : (e.source as any)?.id;
          const tgt = typeof e.target === 'string' ? e.target : (e.target as any)?.id;
          const isConnected = connected.has(src) && connected.has(tgt);
          return {
            ...e,
            style: {
              ...e.style,
              opacity: isConnected ? 1 : 0.05,
              transition: 'opacity 0.25s ease',
            },
          };
        }),
      );
    },
    [rawEdges, setNodes, setEdges],
  );

  // --- On pane click: deselect ---
  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
    setNodes((prev) =>
      prev.map((n) => ({
        ...n,
        style: { ...n.style, opacity: 1, transition: 'opacity 0.25s ease' },
      })),
    );
    setEdges((prev) =>
      prev.map((e) => ({
        ...e,
        style: { ...e.style, opacity: undefined, transition: 'opacity 0.25s ease' },
      })),
    );
  }, [setNodes, setEdges]);

  // --- Apply filters (hide nodes that don't match) ---
  const filteredNodes = useMemo(() => {
    return nodes.map((n) => {
      const data = n.data as Record<string, any>;
      const graphType = RF_TYPE_TO_GRAPH[n.type ?? ''];

      let hidden = false;

      // Node type filter
      if (graphType && !filters.nodeTypes.has(graphType)) {
        hidden = true;
      }

      // Domain filter (only schemas, needs, domain nodes have domainId)
      const domainId = data.domainId as DomainId | undefined;
      if (domainId && !filters.domains.has(domainId)) {
        hidden = true;
      }

      // Schema conditionnel/inconditionnel filter
      if (graphType === 'schema') {
        const schemaType = data.type as string | undefined;
        if (schemaType === 'conditionnel' && !filters.showConditional) hidden = true;
        if (schemaType === 'inconditionnel' && !filters.showInconditional) hidden = true;
      }

      return { ...n, hidden };
    });
  }, [nodes, filters]);

  // Hide edges whose source or target is hidden
  const filteredEdges = useMemo(() => {
    const hiddenIds = new Set(filteredNodes.filter((n) => n.hidden).map((n) => n.id));
    return edges.map((e) => {
      const src = typeof e.source === 'string' ? e.source : (e.source as any)?.id;
      const tgt = typeof e.target === 'string' ? e.target : (e.target as any)?.id;
      return {
        ...e,
        hidden: hiddenIds.has(src) || hiddenIds.has(tgt),
      };
    });
  }, [edges, filteredNodes]);

  // --- Render ---
  if (!isReady) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-slate-50">
        <p className="text-slate-400 animate-pulse">Calcul du layout...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <MapFilters filters={filters} onChange={setFilters} />
      <MapLegend />

      <ReactFlow
        nodes={filteredNodes}
        edges={filteredEdges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        maxZoom={2}
        proOptions={{ hideAttribution: true }}
      >
        <MiniMap
          nodeStrokeWidth={3}
          pannable
          zoomable
          className="!bg-white/80 !border !border-gray-200 !rounded-lg !shadow-sm"
        />
        <Controls className="!bg-white/90 !border !border-gray-200 !rounded-lg !shadow-sm" />
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="#E5E7EB" />
      </ReactFlow>

      <Sidebar node={selectedNode} onClose={() => onPaneClick()} />
    </div>
  );
}
