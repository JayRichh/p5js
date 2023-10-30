import { useEffect, useRef } from 'react'
import P5 from 'p5'
import { mainSketch } from '../mainSketch'

export default function Canvas ({ settings }) {
  const canvasRef = useRef(null)
  const sketchRef = useRef(null)
  const settingsRef = useRef(settings)

  useEffect(() => {
    settingsRef.current = settings

    if (sketchRef.current) {
      sketchRef.current.remove()
    }
    const sketch = mainSketch({ canvasRef, settingsRef })
    sketchRef.current = new P5(sketch)

    return () => {
      if (sketchRef.current) sketchRef.current.remove()
    }
  }, [])

  useEffect(() => {
    settingsRef.current = settings
  }, [settings])

  return (
    <div ref={canvasRef} />
  )
}
