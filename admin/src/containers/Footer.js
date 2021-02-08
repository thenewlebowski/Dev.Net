import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = (props) => {
  return (
    <CFooter fixed={props.fixed ? props.fixed : false}>
      <div>
        <a href="https://dev.node" target="_blank" rel="noopener noreferrer">DevNode</a>
        <span className="ml-1">&copy; 2020 DevNode</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a href="https://dev.node" target="_blank" rel="noopener noreferrer">DevNode</a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
