// LevaControls.jsx
import { useRef } from 'react'
import { useControls, monitor } from 'leva'

export default function LevaControls () {
  const frameRateRef = useRef(0)
  const currentFrameRef = useRef(0)

  const data = useControls({
    width: {
      label: 'Width',
      value: 512,
      step: 2
    },
    height: {
      label: 'Height',
      value: 512,
      step: 2
    },
    cellSize: {
      label: 'Cell Size',
      value: 25,
      step: 2,
      min: 2
    },
    center: {
      label: 'Center',
      value: false
    },
    Framerate: monitor(
      frameRateRef,
      {
        graph: false,
        interval: 60
      }
    ),
    currentFrame: monitor(
      currentFrameRef,
      {
        graph: true,
        interval: 60
      }
    )
  })

  return {
    data,
    frameRateRef,
    currentFrameRef
  }
}
