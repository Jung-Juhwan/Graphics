function loadGL(canvas, vec4_) {
    var gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(vec4_[0], vec4_[1], vec4_[2], vec4_[3]);

    // 투명도 조절 코드 
     gl.enable(gl.BLEND);
     gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    return gl;
};

// webGL setting
function setGL(gl, mVertices, vec4Arr) {
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    var vertexPositionBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(mVertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var vertexColorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vec4Arr), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation(program, "vColor");
    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);
};

// triangle 그리는 함수
function drawTriangle(gl, mVertices, start, vec4_, arr, arr1, arr2) {
    // setGL(gl, mVertices, getColorArray(mVertices.length, vec4_));
    for(var i = start; i < start+3; i++)
    {
        arr.push(mVertices[i]);
     
        arr2.push(vec4_)
    }
    arr1.push(3);
    // gl.drawArrays(gl.TRIANGLES, start, 3);
};

function drawTriangleGR(gl, mVertices, start, vec4Arr, arr, arr1, arr2) {
    //setGL(gl, mVertices, vec4Arr);
    for(var i = start; i < start+3; i++)
    {
        arr.push(mVertices[i]);
        
        arr2.push(vec4Arr[i-start]);
    }
    arr1.push(3);
    //gl.drawArrays(gl.TRIANGLES, start, 3);
};

// Rectangle 그리는 함수 
function drawRectangle(gl, mVertices, start, vec4_, arr, arr1, arr2) {
    //setGL(gl, mVertices, getColorArray(mVertices.length, vec4_));
    for(var i = start; i < start+4; i++)
    {
        arr.push(mVertices[i]);
        
        arr2.push(vec4_);
    }
    arr1.push(4);
    //gl.drawArrays(gl.TRIANGLE_FAN, start, 4);
};

function drawRectangleGR(gl, mVertices, start, vec4Arr, arr, arr1, arr2) {
    //setGL(gl, mVertices, vec4Arr);
    for(var i = start; i < start+4; i++)
    {
        arr.push(mVertices[i]);
        
        arr2.push(vec4Arr[i-start]);
    }
    arr1.push(4);
    //gl.drawArrays(gl.TRIANGLE_FAN, start, 4);
};

// 원그리는 함수 
function drawCircle(gl, r, vec2_, vec4_, t = 1, subAngle = 0, mVertices, arr1, arr2) {
    const noOfFans = 200; // Vertice의 개수

    const centerOfCircle = vec2_;

    const anglePerFna = (2 * Math.PI) / noOfFans;

    var x = vec2_[0];

    var y = vec2_[1];

    var t_;

    var flag = t >= 0;

    

    if (t < 1 && t > -1) t_ = 1;
    else t_ = Math.abs(t);

    var vd =Math.ceil(noOfFans/ t_);
  

    mVertices.push(centerOfCircle);
    arr1.push(vd+2);
    arr2.push(vec4_);


    if (flag)
        for (var i = 0; i <=vd; i++) {
            var angle = anglePerFna * (i + 1);
            mVertices.push(
                vec2(
                    x + Math.cos(angle + subAngle) * r,
                    y + Math.sin(angle + subAngle) * r
                )
            );
            arr2.push(vec4_);
        }
    else
        for (var i = 0; i <= vd; i++) {
            var angle = anglePerFna * (i + 1);
            mVertices.push(
                vec2(
                    x - Math.cos(angle + subAngle) * r,
                    y + Math.sin(angle + subAngle) * r
                )
            );
            arr2.push(vec4_);
        }

//    setGL(gl, mVertices, getColorArray(mVertices.length, vec4_));

    //gl.drawArrays(gl.TRIANGLE_FAN, 0, mVertices.length / t_);
};


function drawCircle_GR(gl, r, vec2_, vec4_a, vec4_b, t = 1, subAngle = 0, mVertices, arr1, colors) {
    const noOfFans = 200; // Vertice의 개수

    const centerOfCircle = vec2_;

    const anglePerFna = (2 * Math.PI) / noOfFans;

    var x = vec2_[0];

    var y = vec2_[1];

    colors.push(vec4_a);

    var t_;

    var flag = t >= 0;

    if (t < 1 && t > -1) t_ = 1;
    else t_ = Math.abs(t);

    var vd =Math.ceil(noOfFans/ t_);
  

    mVertices.push(centerOfCircle);
    arr1.push(vd+2);
    


    if (flag)
        for (var i = 0; i <= vd; i++) {
            var angle = anglePerFna * (i + 1);
            mVertices.push(
                vec2(
                    x + Math.cos(angle + subAngle) * r,
                    y + Math.sin(angle + subAngle) * r
                )
            );
            colors.push(vec4_b);
        }
    else
        for (var i = 0; i <= vd; i++) {
            var angle = anglePerFna * (i + 1);
            mVertices.push(
                vec2(
                    x - Math.cos(angle + subAngle) * r,
                    y + Math.sin(angle + subAngle) * r
                )
            );
            colors.push(vec4_b);
        }

    // setGL(gl, mVertices, colors);

    // gl.drawArrays(gl.TRIANGLE_FAN, 0, mVertices.length / t_);
};

function render(gl, mVertices, arr1, arr2)
{
    setGL(gl, mVertices, arr2);
    var k = 0;

    arr1.forEach(element => {
        gl.drawArrays(gl.TRIANGLE_FAN, k, element);
        k+=element;
    });
}


