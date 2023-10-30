precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D tex0;
uniform vec2 texelSize;

void main() {
    vec4 color = vec4(0.0);
    float weightSum = 0.0;
    for (int i = -4; i <= 4; i++) {
        float weight = exp(-float(i * i) / (2.0 * 4.0 * 4.0));
        color += texture2D(tex0, vTexCoord + vec2(0.0, texelSize.y * float(i))) * weight;
        weightSum += weight;
    }
    gl_FragColor = color / weightSum;
}
