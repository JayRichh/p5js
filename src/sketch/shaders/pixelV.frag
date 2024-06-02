precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D tex0;
uniform float resolution;
uniform float divisions;

void main() {
    float sectionHeight = 1.0 / divisions;
    float newY = floor(vTexCoord.y * divisions) / divisions;
    vec4 color = texture2D(tex0, vec2(vTexCoord.x, newY + sectionHeight / 2.0));
    
    gl_FragColor = color;
}
