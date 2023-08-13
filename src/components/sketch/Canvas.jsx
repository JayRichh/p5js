import { useEffect, useRef } from 'react'
import { useP5Sketch } from '@/components/sketch/utils/useP5Sketch'
import { mainSketch } from './mainSketch'
import canvas from './canvas.module.css'

export default function Canvas (props) {
  const cellSize = useRef(null)

  const canvasRef = useRef(null)
  const sketch = mainSketch(canvasRef, props, cellSize)
  const sketchRef = useP5Sketch(sketch, [])

  useEffect(() => {
    const s = sketchRef.current
    if (sketchRef.current) s.updateCanvas(props.width, props.height)
  }, [props.width, props.height])

  useEffect(() => {
    cellSize.current = props.cellSize
  }, [props.cellSize])

  useEffect(() => {
    const s = sketchRef.current
    if (s) { s.updateSettings({ center: props.center }) }
  }, [props.center])

  return (
    <div ref={canvasRef} className={canvas.canvas} />
  )
}
