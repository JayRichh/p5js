export const gridBuffer = (cellSize) => (s, BUFFERS) => {
  s.gridDraw = () => {
    BUFFERS.GRID.clear()

    BUFFERS.GRID.noStroke()
    BUFFERS.GRID.fill(120)
    for (let x = 0; x < s.width / cellSize.current + 1; x++) {
      for (let y = 0; y < s.height / cellSize.current + 1; y++) {
        BUFFERS.GRID.ellipse(x * cellSize.current, y * cellSize.current, 4)
      }
    }
    s.image(BUFFERS.GRID, 0, 0)
  }
}
