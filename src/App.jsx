import { useState, useEffect } from 'react'
import Canvas, {moveX} from './sketch/canvas/Canvas'
import Button from './components/Button'

function App() {

  return (
    <div className="App">
      <div className="container_ui">
        <Button
          text="Left"
          onClick={() => moveX(-10)}
        />
        <Button
          text="Right"
          onClick={() => moveX(10)}
        />
      </div>
      <Canvas
        sizeX={200}
        sizeY={200}
        fullpage={true}
        centerMode={false}
      />
    </div>
  )
}

export default App