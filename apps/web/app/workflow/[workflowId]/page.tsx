import React from 'react'
import Flow from '@/components/Flow'


const getWorkflowId = (workflowId:string) => {
  return (
    <div>
        <Flow/>
        {/* <Flow workflowId={workflowId}/> */}
    </div>
  )
}

export default getWorkflowId