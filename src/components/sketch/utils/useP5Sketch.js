import { useEffect, useRef } from 'react'

export const useP5Sketch = (sketch, deps = []) => {
  const sketchRef = useRef(null)

  useEffect(() => {
    import('p5').then((P5) => {
      sketchRef.current = new P5.default(sketch)
    })
    return () => {
      if (sketchRef.current) sketchRef.current.remove()
    }
  }, deps) // use the dependencies here

  return sketchRef
}
