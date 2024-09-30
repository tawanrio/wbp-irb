import React from 'react'

export default function BgContainer({ children, color }) {
  return <div style={{ background: color }}> {children}</div>
}
