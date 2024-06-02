import { useLevaControls } from './settings'
import Canvas from './sketch/canvas/Canvas'

function App () {
  const { data, frameRateRef } = useLevaControls()

  return (
    <>
      <Canvas settings={{ ...data, frameRateRef }} />
    </>
  )
}

export default App
