
var gl;
var points;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    var root = Math.sqrt(3) / 2;

    //set rotation angle
    const angle = -Math.PI * 2 / 3;

    // set 8 vertices
    var vertices = [
        vec2(0, 0),
        vec2(-0.25, 0.5 * root),
        vec2(0.25, 0.5 * root),
        vec2(0.5, 0),
        vec2(0.25, -0.5 * root),
        vec2(-0.25, -0.5 * root),
        vec2(-0.5, 0),
        vec2(-0.25, 0.5 * root)
    ];

    // rotate x, y
    for (var i = 0; i < vertices.length; i++) {
        var x = vertices[i][0];
        var y = vertices[i][1];

        vertices[i][0] = x * Math.cos(angle) - y * Math.sin(angle);
        vertices[i][1] = x * Math.sin(angle) + y * Math.cos(angle);
    }

    vertices.push(vertices[1]);

    // set 8 colors
    var colors = [
        vec4(1.0, 1.0, 1.0, 1.0),
        vec4(0.0, 1.0, 0.0, 1.0),
        vec4(1.0, 1.0, 0.0, 1.0), 
        vec4(1.0, 0.0, 0.0, 1.0),
        vec4(1.0, 0.0, 1.0, 1.0),  
        vec4(0.0, 0.0, 1.0, 1.0),
        vec4(0.0, 1.0, 1.0, 1.0)
    ];

    colors.push(colors[1]);

    // set canvas width, height and color
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
  
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var vertexPositionBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var vertexColorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    this.draw(8);
};

function draw(vertex){
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertex);
}
