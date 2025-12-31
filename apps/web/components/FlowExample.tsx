"use client"
import { addEdge, Background, Controls, MiniMap, OnConnect, ReactFlow, useEdgesState, useNodesState, Edge, Connection, Node } from "@xyflow/react"
import { useCallback, useEffect } from 'react';
import '@xyflow/react/dist/style.css';
import { trpc } from "@/utils/trpc";

const nodeTypes = {
  // trigger: TriggerNode
}

const initialNodes: Node[] = []

const initialEdges: Edge[] = []

export default function Flow({ workflowId }: { workflowId?: string}) {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds))
    },
    [setEdges]
  )

  return (
      <div className="h-screen w-full border-2 border-amber-700">
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView // Centers the graph on load
    >
      <Background />
      <Controls />
      <MiniMap />
    </ReactFlow>
  </div>
  )
}