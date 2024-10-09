import React from 'react'
import Container from '@/components/Container'

export default function Description({ content, className }) {
  return (
    <div className={className}>
      <Container>
        <p className={`mt-2 text-lg font-extralight text-white sm:text-3xl`}>
          {content}
        </p>
      </Container>
    </div>
  )
}
