import p5 from "p5"

export default class Square{
    constructor(sketch, x, y, sizeX, sizeY){
        this.sketch = sketch
        this.x = x
        this.y = y
        this.sizeX = sizeX
        this.sizeY = sizeY
    }

    display(x, y){
        this.sketch.rect(x, y, this.sizeX, this.sizeY)
    }
}