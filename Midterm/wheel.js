/////////////////////////////////////////////////////////////////////////////
//
//  wheel.js
//
/////////////////////////////////////////////////////////////////////////////

var canvas;
var gl;


//drawing the wheel

var Planets = {
  middleWheel : undefined,
  spokeOneOne : undefined,
  spokeOneTwo : undefined,
  spokeOneThree : undefined,
  spokeTwoOne : undefined,
  spokeTwoTwo : undefined,
  spokeTwoThree : undefined,
  spokeThreeOne : undefined,
  spokeThreeTwo : undefined,
  spokeThreeThree : undefined,
  spokeFourOne : undefined,
  spokeFourTwo : undefined,
  spokeFourThree : undefined,
  wheelOne : undefined,
  wheelTwo : undefined,
  wheelThree : undefined,
  wheelFour : undefined,
  wheelFive : undefined,
  wheelSix : undefined,
  wheelSeven : undefined,
  wheelEight : undefined,
  wheelNine : undefined,
  wheelTen : undefined,
  wheelEleven : undefined,
  wheelTwelve : undefined,
  wheelThirteen : undefined,
  wheelFourteen : undefined,
  wheelFifteen : undefined,
  wheelSixteen : undefined,
  wheelSeventeen : undefined,
  wheelEighteen : undefined,
  wheelNineteen : undefined,
  wheelTwenty : undefined,  
  
};

// Viewing transformation parameters
var V;  // matrix storing the viewing transformation

// Projection transformation parameters
var P;  // matrix storing the projection transformation
var near = 10;      // near clipping plane's distance
var far = 120;      // far clipping plane's distance

// Animation variables
var time = 0.0;      // time, our global time constant, which is 
                     // incremented every frame
var timeDelta = 0.5; // the amount that time is updated each fraime


//---------------------------------------------------------------------------
//
//  init() - scene initialization function
//

function init() {
  canvas = document.getElementById("webgl-canvas");
 //var myCanvas = document.getElementbyId("myCanvas");
  //var canvas = document.getElementsbyTagName("canvas");

  // Configure our WebGL environment
  gl = WebGLUtils.setupWebGL(canvas);
  if (!gl) { alert("WebGL initialization failed"); }

  gl.clearColor(0.0, 0.0, 0.0, 0.0);
  
  gl.enable(gl.DEPTH_TEST);
  
  // Initialize the planets in the Planets list, including specifying
  // necesasry shaders, shader uniform variables, and other initialization
  // parameters.  This loops adds additinoal properties to each object
  // in the Planets object;

  for (var name in Planets ) {

    // Create a new sphere object for our planet, and assign it into the
    // appropriate place in the Planets dictionary.  And to simplify the code
    // assign that same value to the local variable "p", for later use.

    var planet = Planets[name] = new Sphere();

    // For each planet, we'll add a new property (which itself is a 
    // dictionary) that contains the uniforms that we will use in
    // the associated shader programs for drawing the planets.  These
    // uniform's values will be set each frame in render().

    planet.uniforms = { 
      color : gl.getUniformLocation(planet.program, "color"),
      MV : gl.getUniformLocation(planet.program, "MV"),
      P : gl.getUniformLocation(planet.program, "P"),
    };
  }

  resize();

  window.requestAnimationFrame(render);  
}

//---------------------------------------------------------------------------
//
//  render() - render the scene
//

function render() {
  time += timeDelta;

  var ms = new MatrixStack();

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);


  V = translate(0.0, 0.0, -0.5*(near + far));
  ms.load(V);  

  //using matrix stack to draw and render wheel parts and spokes

  var name, planet, data;
  
  //rendering the middle part of the wheel
  
  name = "middleWheel";
  planet = Planets[name];
  data = SolarSystem[name];
  
  

  planet.PointMode = false; 
  


  ms.push();
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  //rendering the spokes of the wheel
  
  name = "spokeOneOne";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance , 0, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  
  name = "spokeOneTwo";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance , 0, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  
  Ename = "spokeOneThree";
  Eplanet = Planets[Ename];
  Edata = SolarSystem[Ename];

  Eplanet.PointMode = false;

  ms.push();
  ms.rotate(Edata.year * time, Edata.axis);
  ms.translate(Edata.distance , 0, 0);
  ms.scale(Edata.radius);
  gl.useProgram(Eplanet.program);
  gl.uniformMatrix4fv(Eplanet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(Eplanet.uniforms.P, false, flatten(P));
  gl.uniform4fv(Eplanet.uniforms.color, flatten(Edata.color));
  Eplanet.render();
  ms.pop();
  
  
  name = "spokeTwoOne";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(-data.distance , 0, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  
  name = "spokeTwoTwo";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

 ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(-data.distance , 0, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
 
  name = "spokeTwoThree";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(-data.distance , 0, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  

  
  
  name = "spokeThreeOne";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;
  
  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 7.5, 4.5,  0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();

  name = "spokeThreeTwo";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;
  
  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 4, 8,  0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
    
  name = "spokeThreeThree";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 10.5, 11,  0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "spokeFourOne";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;
  
  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 7.5, -4.5,  0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "spokeFourTwo";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;
  
  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 3.5, -8,  0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();

  name = "spokeFourThree";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 10.5, -11, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  //rendering the connecting parts of the wheel
  
  name = "wheelOne";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 8, -11, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "wheelTwo";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 11.5, -10, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "wheelThree";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 13, -9, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "wheelThree";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 14, -6.5, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "wheelFour";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 15, -4, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "wheelFive";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 15, -4, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "wheelSix";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance + 0.5, 11, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "wheelSeven";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance + 3.5, 9, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "wheelEight";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance + 5.5, 7.5, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "wheelNine";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance + 7, 5.5, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "wheelTen";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance + 8, 3, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
    name = "wheelEleven";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance + 7, -4, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "wheelTwelve";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance + 6, -6, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "wheelThirteen";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance + 4.5, -7.5, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "wheelFourteen";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance + 2.5, -10, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "wheelFifteen";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance , -11, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
    name = "wheelSixteen";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 16, 3, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "wheelSeventeen";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 14, 6, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "wheelEighteen";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 12, 7.5, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "wheelNineteen";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 10, 9, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  
  name = "wheelTwenty";
  planet = Planets[name];
  data = SolarSystem[name];

  planet.PointMode = false;

  ms.push();
  ms.rotate(data.year * time, data.axis);
  ms.translate(data.distance - 7, 11, 0);
  ms.scale(data.radius);
  gl.useProgram(planet.program);
  gl.uniformMatrix4fv(planet.uniforms.MV, false, flatten(ms.current()));
  gl.uniformMatrix4fv(planet.uniforms.P, false, flatten(P));
  gl.uniform4fv(planet.uniforms.color, flatten(data.color));
  planet.render();
  ms.pop();
  window.requestAnimationFrame(render);
}

//---------------------------------------------------------------------------
//
//  resize() - handle resize events
//

function resize() {
  var w = canvas.clientWidth;
  var h = canvas.clientHeight;

  gl.viewport(0, 0, w, h);

  var fovy = 50.0; // degrees
  var aspect = w / h;

  P = perspective(fovy, aspect, near, far);
}

//---------------------------------------------------------------------------
//
//  Window callbacks for processing various events
//

window.onload = init;
window.onresize = resize;