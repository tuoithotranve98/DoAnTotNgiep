import React from 'react'
import './Guard.scss'

export default ({ backgroundColor }) => (
  <div
    className="content"
    style={{
      display: 'table',
      margin: '0 auto',
      marginTop: '10%'
    }}
  >
    <div className="load-wrapp" style={{ backgroundColor }}>
      <div className="load-9">
        <div className="spinner">
          <div className="bubble-1" />
          <div className="bubble-2" />
        </div>
      </div>
    </div>
  </div>
)
