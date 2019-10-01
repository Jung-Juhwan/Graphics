var canvas
var gl;

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }


    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    renderView(); // draw view
};

function renderView() {
   renderBackground(); // draw background
   renderCircle(0.15, 0.75, 0.5, vec4(1, 0.8, 0, 1)); // draw sun
   renderMt(); // draw mountain
 
   renderCloud(-0.8, 0.55, vec4(1,0.25,0.25,1)); //draw cloud
   renderCloud(-0.15, 0.17, vec4(0.7,0.1,0.1,1));//draw cloud
   
   renderBoat(-0.8,-0.3,0.1,vec4(0.5,0.25,0,1));//draw boat
   renderBoat(-0.2,-0.6,0.2,vec4(0.1,0.8,0.2,0.2));//draw boat
   renderBoat(0.1,-0.2,0.15,vec4(0.85,0.6,0.1,0.7));//draw boat
};

/*draw background (ocean & sky)*/
function renderBackground(){
   // vertex position
   var vertices = [
      vec2(-1.0, 1.0),
      vec2(-1.0, 0.0), 
      vec2(1.0, 0.0), 
      vec2(1.0,1.0), 
      vec2(-1.0, 0.0), 
      vec2(-1.0, -3.0),
      vec2(0.75, -3.0),
      vec2(0.75,0.0),
      vec2(0.75, 0.0), 
      vec2(0.75, -3.0),
      vec2(1.0, -3.0),
      vec2(1.0,0.0),
      vec2(0.6,0.0),
      vec2(0.9,0.0),
      vec2(0.75,-3),
  ];	

 // vertex color (R, G, B, A)
 var colors = [
      vec4(1.0, 0.0, 0.0, 1.0),    
      vec4(0.0, 0.0, 0.0, 1.0), 
      vec4(0.0, 0.0, 0.0, 1.0), 
      vec4(1.0, 0.0, 0.0, 1.0), 
      vec4(0.0, 0.0, 0.0, 1.0), 
      vec4(0.0, 0.0, 1.0, 1.0),
      vec4(0.0, 0.0, 1.0, 1.0), 
      vec4(0.0, 0.0, 0.0, 1.0), 
      vec4(0.0, 0.0, 0.0, 1.0), 
      vec4(0.0, 0.0, 1.0, 1.0),
      vec4(0.0, 0.0, 1.0, 1.0), 
      vec4(0.0, 0.0, 0.0, 1.0), 
      vec4(1.0, 0.8, 0.0, 0.6),    
      vec4(1.0, 0.8, 0.0, 0.6), 
      vec4(0.0, 0.0, 1.0, 0.6), 
  ];

  settings(vertices,colors);
  gl.clear( gl.COLOR_BUFFER_BIT );    
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4); 
  gl.drawArrays(gl.TRIANGLE_FAN,4,4);
  gl.drawArrays(gl.TRIANGLE_FAN,8,4);
  gl.drawArrays(gl.TRIANGLES, 12, 3); 

};

// draw mountain
function renderMt(){

      const frontColor = vec4(0.0, 0.0, 0.0, 1.0);
      const backColor=vec4(0.0,0.0,0.0,1.0);
  
      const frontColor_GR = [
          frontColor,
          vec4(0.3, 0.2, 0.1, 0.8),
          frontColor
      ];
  
      const backColor_GR = [
        backColor,
        vec4(0.3, 0.2, 0.1, 0.8),
        backColor
    ];
      var mVertices = [
          vec2(-1, 0.0),
          vec2(-0.4, 0.1),
          vec2(0.4, 0.0), 
          vec2(-0.2,0),
          vec2(0.2, 0.14),
          vec2(0.6, 0.0),

      ];
  
      // back mountain
      settings(verticies(mVertices, 0, 3),backColor_GR);
      gl.drawArrays(gl.TRIANGLES,0,3);
      // front mountain
      settings(verticies(mVertices, 3, 3),frontColor_GR);
      gl.drawArrays(gl.TRIANGLES,0,3);
};

//draw cloud - make circles 
function renderCloud(x, y, white) {

    renderCircle(0.1, 0.05 + x, 0.3 + y, white)
    renderCircle(0.1, 0.2 + x, 0.33 + y, white)
    renderCircle(0.1, 0.35 + x, 0.32 + y, white)
    renderCircle(0.1, 0.4 + x, 0.25 + y, white)

    renderCircle(0.1, 0.0 + x, 0.2 + y, white)
    renderCircle(0.1, 0.1 + x, 0.2 + y, white)
    renderCircle(0.1, 0.2 + x, 0.15 + y, white)
    renderCircle(0.1, 0.3 + x, 0.2 + y, white)
};

//draw boat
function renderBoat(a,b,size,color){

    var mVertices=[
        vec2(-1,0),
        vec2(-0.25,-0.5),
        vec2(1,-0.5),
        vec2(1,0),
        vec2(-0.25,0),
        vec2(0.75,0),
        vec2(0.75,0.5),
        vec2(0.25,0.5),
        vec2(0.5,0.5),
        vec2(0.75,0.5),
        vec2(0.75,0.75),
        vec2(0.5,0.75),

    ];

    // set size & move x,y
    for(i=0;i<mVertices.length;i++){
        mVertices[i][0]=mVertices[i][0]*size+a;
        mVertices[i][1]=mVertices[i][1]*size+b;
    }

  

    settings(mVertices, getColorArray(mVertices.length, color));
    gl.drawArrays(gl.TRIANGLE_FAN,0,4);
    gl.drawArrays(gl.TRIANGLE_FAN,4,4);
    gl.drawArrays(gl.TRIANGLE_FAN,8,4);
}

//draw circle
function renderCircle(r, x, y, color) {


   const noOfFans = 200; //vertex's count

   const centerOfCircle = vec2(x, y);

   const anglePerFna = (2 * Math.PI) / noOfFans;

   const mVertices = [

   ];

   mVertices.push(centerOfCircle);

   for (var i = 0; i <= noOfFans; i++) {
       var angle = anglePerFna * (i + 1);
       mVertices.push(
           vec2(
               x + Math.cos(angle) * r,
               y + Math.sin(angle) * r
           )
       );
   }

   settings(mVertices, getColorArray(mVertices.length, color));

   gl.drawArrays(gl.TRIANGLE_FAN, 0, mVertices.length);
};

// set vertices
function verticies(mVertices, s, l) {


   const mV = [];

   for (var i = s; i < s + l; i++) {
       mV.push(mVertices[i]);
   }

   return mV;
};

// function to get color
function getColorArray(len, vec4_) {


   const mColor = [];

   for (var i = 0; i < len; i++) {
       mColor.push(vec4_)
   }

   return mColor;
};

//function for setting
function settings(mVertices, vec4Arr) {

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