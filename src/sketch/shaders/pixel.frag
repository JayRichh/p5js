precision mediump float;

varying vec2 vTexCoord;
uniform sampler2D tex0;
uniform vec2 resolution;
uniform float pixelSize;

void main() {
    // Calculate the size of each pixel
    vec2 pixelSizeVec = vec2(pixelSize) / resolution;

    // Calculate the coordinate of the pixel fragment
    vec2 pixelCoord = vTexCoord / pixelSizeVec;

    // Round the coordinate to the nearest lower integer value
    vec2 roundedCoord = floor(pixelCoord) * pixelSizeVec;

    // Fetch the color of the pixel from the original texture
    vec4 pixelColor = texture2D(tex0, roundedCoord);

    // Output the color of the pixel
    gl_FragColor = pixelColor;
}
