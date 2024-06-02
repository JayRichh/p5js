import vert from './shaders/basic.vert'

export default class ShaderManager {
  constructor (p5Instance) {
    this.p5 = p5Instance
    this.shaders = {}
  }

  loadShader (name, fragmentShader, setupFn) {
    const shader = this.p5.createShader(vert, fragmentShader)
    if (setupFn) setupFn(shader)
    this.shaders[name] = shader
  }

  applyShader (name, sourceBuffer, targetBuffer, uniforms = {}) {
    const shader = this.shaders[name]
    targetBuffer.begin()
    this.p5.clear()
    this.p5.shader(shader)
    shader.setUniform('tex0', sourceBuffer.color)
    Object.keys(uniforms).forEach(key => shader.setUniform(key, uniforms[key]))
    this.p5.rect(-this.p5.width / 2, -this.p5.height / 2, this.p5.width, this.p5.height)
    targetBuffer.end()
  }
}
