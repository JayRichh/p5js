// PostProcessor.js
export default class PostProcessor {
    constructor(p5Instance, shaderManager) {
      this.p5 = p5Instance;
      this.shaderManager = shaderManager;
      this.buffer1 = this.p5.createFramebuffer();
      this.buffer2 = this.p5.createFramebuffer();
      this.currentSourceBuffer = this.buffer1;
      this.currentTargetBuffer = this.buffer2;
    }

    startDraw() {
        this.currentSourceBuffer.begin();
        this.p5.clear();
      }
    
      endDraw() {
        this.currentSourceBuffer.end();
      }
  
    applyShader(shaderName, uniforms = {}) {
      this.shaderManager.applyShader(shaderName, this.currentSourceBuffer, this.currentTargetBuffer, uniforms);
      this._swapBuffers();
    }
  
    output() {
      this.p5.image(this.currentSourceBuffer, -this.p5.width / 2, -this.p5.height / 2);
    }
  
    _swapBuffers() {
      [this.currentSourceBuffer, this.currentTargetBuffer] = [this.currentTargetBuffer, this.currentSourceBuffer];
    }
  }
  