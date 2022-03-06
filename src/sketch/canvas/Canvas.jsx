import React, { useState, useEffect, useRef } from 'react'
import p5 from "p5"

import Square from "./../components/Square"

let posX = 0

export default function Canvas(props) {

    const renderTarget = useRef()

    useEffect(() => {
        let sketchInstance = new p5(sketch, renderTarget.current)
        return () => sketchInstance.remove()
    }, [props])

    const sketch = (s) => {

        let canvasSize = {
            x: props.fullpage ? window.innerWidth : props.sizeX,
            y: props.fullpage ? window.innerHeight : props.sizeY
        }
        let square = new Square(s, posX, 0, 100, 100)

        s.setup = () => {
             s.createCanvas(canvasSize.x, canvasSize.y)
        }
        s.draw = () => {
            if(props.centerMode)
                s.translate(window.innerWidth / 2, window.innerHeight / 2)

            s.background(0)
            s.noStroke()
            s.fill(255)
            square.display(posX, 0)
        }
        s.windowResized = () => {
            if(props.fullpage)
                s.resizeCanvas(window.innerWidth, window.innerHeight)
        }
    }

    return (
        <div className="canvas" ref={renderTarget}></div>
    )
}

export function moveX(value_x) {
    posX += value_x
}