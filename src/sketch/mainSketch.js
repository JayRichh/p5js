import fragmentH from './shaders/blurH.frag'
import fragmentV from './shaders/blurV.frag'
import colorama from "./shaders/colorama.frag";
import pixel from "./shaders/pixel.frag"
import pixelV from "./shaders/pixelV.frag"
import posterize from "./shaders/posterize.frag"
import ShaderManager from './shaderManager';

export const mainSketch = ({ canvasRef, settingsRef }) => (s) => {

    let shaderManager;
    let buffer1, buffer2
    const blurIterations = 21
    let coloramaTime = 0;

    s.setup = () => {
      
      const canvas = s.createCanvas(500, 500, s.WEBGL)
      canvas.id('mainCanvas')
      canvas.parent(canvasRef.current)
      
      s.frameRate(60)
      s.noSmooth()

        shaderManager = new ShaderManager(s)
        shaderManager.loadShader('blurH', fragmentH);
        shaderManager.loadShader('blurV', fragmentV);
        shaderManager.loadShader('colorama', colorama);
        shaderManager.loadShader('pixel', pixel);
        shaderManager.loadShader('pixelV', pixelV);
        shaderManager.loadShader('posterize', posterize);

        buffer1 = s.createFramebuffer()
        buffer2 = s.createFramebuffer()

    }

    s.draw = () => {
        buffer1.begin()
        s.background(0)
        s.rectMode(s.CENTER)
        s.ellipse(0, 0, s.frameCount%300)
        buffer1.end()

        // POSTPROCESSING
        for (let i = 0; i < blurIterations; i++) {
          shaderManager.applyShader('blurH', buffer1, buffer2, { texelSize: [1.0 / s.width, 0.0] });
          [buffer1, buffer2] = [buffer2, buffer1];
          if (i < blurIterations - 1) {
            shaderManager.applyShader('blurV', buffer1, buffer2, { texelSize: [0.0, 1.0 / s.height] });
            [buffer1, buffer2] = [buffer2, buffer1];
          }
        }

        // COLORAMA
        // shaderManager.applyShader('colorama', buffer1, buffer2, { time: coloramaTime, vColor1: [1.0, 1.0, 1.0], vColor2: [0.0, 0.0, 0.0], gradientLoops: 1 });
        // [buffer1, buffer2] = [buffer2, buffer1];
        // coloramaTime += 0.01;

        // PIXEL
        // shaderManager.applyShader('pixel', buffer1, buffer2, {resolution: [s.width, s.height], pixelSize: 5});
        // [buffer1, buffer2] = [buffer2, buffer1];
        
        // POSTERIZE
        shaderManager.applyShader('posterize', buffer1, buffer2, {levels: 2});
        [buffer1, buffer2] = [buffer2, buffer1];
        
        // VERTICAL PIXEL
        shaderManager.applyShader('pixelV', buffer1, buffer2, {resolution: s.height, divisions: settingsRef.current.Divisions});
        [buffer1, buffer2] = [buffer2, buffer1];
        

        s.image(buffer1, -s.width / 2, -s.height / 2);
        settingsRef.current.frameRateRef.current = s.frameRate()
    }
}