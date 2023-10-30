precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D tex0;
uniform int levels;

void main() {
    vec4 color = texture2D(tex0, vTexCoord);
    float step = 1.0 / float(levels - 1);
    
    color.r = floor(color.r / step) * step;
    color.g = floor(color.g / step) * step;
    color.b = floor(color.b / step) * step;
    
    gl_FragColor = color;
}
