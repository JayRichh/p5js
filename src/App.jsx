import { useState, useEffect } from 'react'
import Canvas, {moveX} from './sketch/canvas/Canvas'
import moveShape from './sketch/functions/MoveShape'
import Panel from './components/Panel'
import Button from './components/Button'

function App() {

  return (
    <div className="App">
      <Panel>
        <Button
          text="Left"
          onClick={() => moveX(-10)}
        />
        <Button
          text="Right"
          onClick={() => moveX(10)}
        />
      </Panel>
      <Canvas
        sizeX={200}
        sizeY={200}
        fullpage={true}
        centerMode={true}
      />
    </div>
  )
}

export default App