export const debugBuffer = () => (s, BUFFERS) => {
  s.bufferDraw = () => {
    BUFFERS.DEBUG.clear()

    BUFFERS.DEBUG.noStroke()
    BUFFERS.DEBUG.fill(0)
    BUFFERS.DEBUG.text('0, 0', 5, 15)

    s.image(BUFFERS.DEBUG, 0, 0)
  }
}
