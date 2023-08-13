import { BUFFERS } from './utils/buffers'
import { gridBuffer } from './gridBuffer'
import { debugBuffer } from './debugBuffer'

export const mainSketch = (canvasRef, props, cellSize) => (s) => {
  let settings = {
    center: props.center
  }

  let x = 0
  const fps = 60
  const duration = 120
  let currentFrame = 0

  const grid = gridBuffer(cellSize)
  grid(s, BUFFERS)
  const debug = debugBuffer()
  debug(s, BUFFERS)

  s.setup = () => {
    s.frameRate(fps)
    s.pixelDensity(1)

    BUFFERS.MAIN = s.createCanvas(props.width, props.height)
    BUFFERS.MAIN.id('MainCanvas')
    BUFFERS.MAIN.parent(canvasRef.current)
    Object.keys(BUFFERS).forEach((k, i) => {
      if (i !== 0) {
        const tempDescription = BUFFERS[k]
        BUFFERS[k] = s.createGraphics(props.width, props.height)

        const canvasElem = BUFFERS[k].canvas
        canvasElem.id = tempDescription
        canvasRef.current.appendChild(canvasElem)
      }
    })
  }

  s.draw = () => {
    if (settings.center === true) { s.translate(s.width / 2, s.height / 2) }

    x++
    currentFrame++
    props.setFrameRate(s.frameRate())
    props.setCurrentFrame(currentFrame)

    s.background(255, 0, 0)
    s.fill(0)
    s.rect(x, 50, 50, 50)

    s.gridDraw()
    s.bufferDraw()

    if (currentFrame >= duration) {
      resetLoop()
    }
  }

  const resetLoop = () => {
    currentFrame = 0
    x = 0
  }

  s.updateCanvas = (w, h) => {
    Object.keys(BUFFERS).forEach((k, i) => {
      if (i !== 0) {
        BUFFERS[k].resizeCanvas(w, h)
      } else {
        s.resizeCanvas(w, h)
      }
    })
  }

  s.updateSettings = (newSettings) => {
    settings = { ...settings, ...newSettings }
  }
}
