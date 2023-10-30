import fragmentH from './shaders/blurH.frag'
import fragmentV from './shaders/blurV.frag'
import colorama from "./shaders/colorama.frag";
import pixel from "./shaders/pixel.frag"
import pixelV from "./shaders/pixelV.frag"
import posterize from "./shaders/posterize.frag"
import ShaderManager from './shaderManager';
import PostProcessor from './postProcessor';

export const mainSketch = ({ canvasRef, settingsRef }) => (s) => {

    let shaderManager, postProcessor;
    const blurIterations = 21
    let coloramaTime = 0;

    s.setup = () => {
      
      const canvas = s.createCanvas(500, 500, s.WEBGL)
      canvas.id('mainCanvas')
      canvas.parent(canvasRef.current)
      
      s.frameRate(60)
      s.noSmooth()

        shaderManager = new ShaderManager(s)
        postProcessor = new PostProcessor(s, shaderManager);
        shaderManager.loadShader('blurH', fragmentH);
        shaderManager.loadShader('blurV', fragmentV);
        shaderManager.loadShader('colorama', colorama);
        shaderManager.loadShader('pixel', pixel);
        shaderManager.loadShader('pixelV', pixelV);
        shaderManager.loadShader('posterize', posterize);

    }

    s.draw = () => {
      postProcessor.startDraw()
        s.background(0)
        s.rectMode(s.CENTER)
        s.ellipse(0, 0, s.frameCount%300)
        postProcessor.endDraw()

        // POSTPROCESSING
        for (let i = 0; i < blurIterations; i++) {
          postProcessor.applyShader('blurH', { texelSize: [1.0 / s.width, 0.0] });
          if (i < blurIterations - 1) {
            postProcessor.applyShader('blurV', { texelSize: [0.0, 1.0 / s.height] });
          }
        }

        // COLORAMA
        postProcessor.applyShader('colorama', { time: coloramaTime, vColor1: [1.0, 1.0, 1.0], vColor2: [0.0, 0.0, 0.0], gradientLoops: 1 });
        coloramaTime += 0.01;

        // PIXEL
        postProcessor.applyShader('pixel', {resolution: [s.width, s.height], pixelSize: 5});
        
        // POSTERIZE
        // postProcessor.applyShader('posterize', {levels: 3});
        
        // VERTICAL PIXEL
        postProcessor.applyShader('pixelV', {resolution: s.height, divisions: settingsRef.current.Divisions});
        

        postProcessor.output()
        settingsRef.current.frameRateRef.current = s.frameRate()
    }
}