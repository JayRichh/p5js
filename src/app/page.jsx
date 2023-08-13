'use client'

import { Leva } from 'leva'
import Canvas from '@/components/sketch/Canvas'
import LevaControls from '@/components/UI/useLevaControls'

export default function Home () {
  const { data, frameRateRef, currentFrameRef } = LevaControls()

  return (
    <main>
      <Leva
        titleBar={{
          drag: false,
          filter: false
        }}
      />
      <Canvas
        width={data.width}
        height={data.height}
        cellSize={data.cellSize}
        setFrameRate={(e) => { frameRateRef.current = e }}
        setCurrentFrame={(e) => { currentFrameRef.current = e }}
        center={data.center}
      />
    </main>
  )
}
