export const mainSketch = ({ canvasRef, settingsRef }) => (s) => {
    s.setup = () => {
        const canvas = s.createCanvas(500, 500)
        canvas.id('mainCanvas')
        canvas.parent(canvasRef.current)

    }

    s.draw = () => {
        s.background(255, 120, 0)
        s.rect(settingsRef.current.Divisions, 20, 50)

        settingsRef.current.frameRateRef.current = s.frameRate()
    }
}