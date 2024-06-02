precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D tex0;
uniform float gradientLoops;
uniform float time;
uniform vec3 vColor1;
uniform vec3 vColor2;

void main() {
    vec4 centerColor = texture2D(tex0, vTexCoord);
    
    // Pixel Brightness
    float luminance = dot(centerColor.rgb, vec3(0.299, 0.587, 0.114));
    
    // Shift color
    float adjustedLuminance = fract(luminance * gradientLoops - time);

    // Define gradient colors
    vec3 color1 = vec3(vColor1);
    vec3 color2 = vec3(vColor2);

    // Create gradient (color1 -> color2 -> color1)
    vec3 color = mix(color1, color2, adjustedLuminance * 2.0);
    if (adjustedLuminance > 0.5) {
        color = mix(color2, color1, (adjustedLuminance - 0.5) * 2.0);
    }

    gl_FragColor = vec4(color, centerColor.a);
}
