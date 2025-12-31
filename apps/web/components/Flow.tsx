"use client"
import { trpc } from '@/utils/trpc';
import { addEdge, Connection, Edge, Node, ReactFlow, useEdgesState, useNodesState , FitViewOptions, DefaultEdgeOptions} from '@xyflow/react';
import "@xyflow/react/dist/style.css"
import { useCallback, useEffect, useState } from 'react';

const initialNodes: Node[] = []
const intialEdges: Edge[] = []

const fitViewOptions: FitViewOptions = {
  padding: 0.2,
};

const defaultEdgeOptions: DefaultEdgeOptions = {
  animated: true,
};

const Flow = ({workflowId}:{workflowId: string}) => {

  // fetching data from the server
  const {data} = trpc.workflow.getOne.useQuery({id: workflowId})
  
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(intialEdges)
  const [isInitialized, setIsIntialized] = useState(false) // for preventing db from overwriting the unsaved workflow
  
  // triggers whenever the data variable changes.
  useEffect(() => {
    // if data exists and we haven't yet initialized workflow yet
    if(data && !isInitialized) {
    /*
      // handling 2 cases:
        Case A: You returned the workflow directly (data = workflow)
        Case B: You returned a wrapper (data = { getWorkflow: workflow })
    */
      //TODO: for now we are ignnoring this error
      
      const workflowData = data.getWorkflow
      
      if(workflowData?.definition){

      }
      
    }
  }, [data, isInitialized])
  
  const onConnect = useCallback(
  (connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds))
  },
  [setEdges],
  )

  return (
    <div className='h-screen'>
        <ReactFlow nodes={nodes} edges={edges} onConnect={onConnect} fitView fitViewOptions={fitViewOptions} defaultEdgeOptions={defaultEdgeOptions}/>
    </div>
  )
}

export default Flow