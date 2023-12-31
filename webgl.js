var cubeRotation = 0.0;
var camRotationX = 2.0, camRotationY = 0.0;
var startAngle = Math.random() * 2.0 * Math.PI;
var floatRadius = 60.0;
var floatCamHeight = 6.0, floatCamLookAtHeight = floatCamHeight - 12.0;
var ZTranslation = floatRadius * Math.sin(startAngle), XTranslation = floatRadius * Math.cos(startAngle), YTranslation = floatCamHeight;
var YLookAt = floatCamLookAtHeight, XLookAt = floatRadius * Math.cos(startAngle + Math.PI), ZLookAt = floatRadius * Math.sin(startAngle + Math.PI);
var WDown = false, ADown = false, SDown = false, DDown = false, aRight = false, aLeft = false, aUp = false, aDown = false;
var numCubes = 4, mazeWidth = 50, mazeHeight = 50;
var primDeepBranchFactor = 10.0;
var canvasMaze;
var floatCam = true;
var floatQuit = true;
var floatRotation = 0.0;
var floatTime = 0.0;
var randMaze = [];
for (var i = 0; i < mazeWidth; i++) {
  randMaze[i] = [mazeHeight];
  for (var j = 0; j < mazeHeight; j++) {
    randMaze[i][j] = false;
  }
}

main();


function logKeyDown(e) {
  if (e.code == "KeyA") {
    ADown = true;
    floatCam = false;
  } else if (e.code == "KeyW") {
    WDown = true;
    floatCam = false;
  } else if (e.code == "KeyS") {
    SDown = true;
    floatCam = false;
  } else if (e.code == "KeyD") {
    DDown = true;
    floatCam = false;
  } else if (e.code == "ArrowLeft") {
    aLeft = true;
    floatCam = false;
  } else if (e.code == "ArrowRight") {
    aRight = true;
  } else if (e.code == "ArrowDown") {
    aDown = true;
    floatCam = false;
  } else if (e.code == "ArrowUp") {
    aUp = true;
    floatCam = false;
  }
}

function logKeyUp(e) {
  if (e.code == "KeyA") {
    ADown = false;
  } else if (e.code == "KeyW") {
    WDown = false;
  } else if (e.code == "KeyS") {
    SDown = false;
  } else if (e.code == "KeyD") {
    DDown = false;
  } else if (e.code == "ArrowLeft") {
    aLeft = false;
  } else if (e.code == "ArrowRight") {
    aRight = false;
  } else if (e.code == "ArrowDown") {
    aDown = false;
  } else if (e.code == "ArrowUp") {
    aUp = false;
  }
}

function createRandMaze(i, j) {
  // Using Prim's Algorithm
  var numPossibilities = 0, temp = j - 2, n = false, e = false, s = false, w = false;
  if (temp >= 1 && !randMaze[i][temp]) {
    ++numPossibilities;
    n = true;
  }
  temp = i + 2;
  if (temp <= mazeWidth - 2 && !randMaze[temp][j]) {
    ++numPossibilities;
    e = true;
  }
  temp = j + 2;
  if (temp <= mazeWidth - 2 && !randMaze[i][temp]) {
    ++numPossibilities;
    s = true;
  }
  temp = i - 2;
  if (temp >= 1 && !randMaze[temp][j]) {
    ++numPossibilities;
    w = true;
  }
  var direction = Math.floor(Math.random() * numPossibilities);
  if (n) {
    if (direction == 0) {
      randMaze[i][j - 2] = randMaze[i][j - 1] = true;
      var deepShort = 1;//Math.floor(Math.random() * primDeepBranchFactor);
      if (deepShort == 0) {
        createRandMaze(i, j);
      }
      createRandMaze(i, j - 2);
      if (deepShort != 0) {
        createRandMaze(i, j);
      }
      createRandMaze(i, j);
      e = s = w = false;
    }
    else {
      --direction;
    }
  }
  if (e) {
    if (direction == 0) {
      randMaze[i + 2][j] = randMaze[i + 1][j] = true;
      var deepShort = 1;//Math.floor(Math.random() * primDeepBranchFactor);
      if (deepShort == 0) {
        createRandMaze(i, j);
      }
      createRandMaze(i + 2, j);
      if (deepShort != 0) {
        createRandMaze(i, j);
      }
      createRandMaze(i, j);
      s = w = false;
    }
    else {
      --direction;
    }
  }
  if (s) {
    if (direction == 0) {
      randMaze[i][j + 2] = randMaze[i][j + 1] = true;
      var deepShort = 1;//Math.floor(Math.random() * primDeepBranchFactor);
      if (deepShort == 0) {
        createRandMaze(i, j);
      }
      createRandMaze(i, j + 2);
      if (deepShort != 0) {
        createRandMaze(i, j);
      }
      createRandMaze(i, j);
      w = false;
    }
    else {
      --direction;
    }
  }
  if (w) {
    if (direction == 0) {
      randMaze[i - 2][j] = randMaze[i - 1][j] = true;
      var deepShort = 1;//Math.floor(Math.random() * primDeepBranchFactor);
      if (deepShort == 0) {
        createRandMaze(i, j);
      }
      createRandMaze(i - 2, j);
      if (deepShort != 0) {
        createRandMaze(i, j);
      }
      createRandMaze(i, j);
    }
    else {
      --direction;
    }
  }
}

//
// Start here
//
function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl');

  document.addEventListener('keydown', logKeyDown);
  document.addEventListener('keyup', logKeyUp);
  var imgMaze = document.getElementById('maze-img');
  canvasMaze = document.createElement('canvas');
  mazeWidth = 50;//canvasMaze.width = imgMaze.width;
  mazeHeight = 50;//canvasMaze.height = imgMaze.height;
  randMaze[1][1] = true;
  createRandMaze(1, 1);
  canvasMaze.getContext('2d').drawImage(imgMaze, 0, 0, imgMaze.width, imgMaze.height);
  //XLookAt = mazeWidth;
  //ZLookAt = mazeHeight;
  XTranslation += 3.0 * mazeWidth;
  ZTranslation += 3.0 * mazeHeight;
  XLookAt += 3.0 * mazeWidth;
  ZLookAt += 3.0 * mazeHeight;

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec2 aTextureCoord;

    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying highp vec2 vTextureCoord;

    uniform sampler2D uSampler;

    void main(void) {
      gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
  `;

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);

  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aTextureCoord and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers = initBuffers(gl);

  const texture = loadTexture(gl, 'img/grassBush.jpg');

  var then = 0;

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.001;  // convert to seconds
    const deltaTime = now - then;
    then = now;

    drawScene(gl, programInfo, buffers, texture, deltaTime);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function initBuffers(gl) {

  // Create a buffer for the cube's vertex positions

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.
  var halfSize = 1.0
  var cubeOffsetX = 0.0, cubeOffsetY = 0.0, cubeOffsetZ = 0.0;
  // TWO CUBES WORKING
  var positions = [];
  {
    var i, j;
    cubeOffsetY = 0.0;
    halfSize = mazeWidth;
    var bigOffset = mazeWidth - 1;
    cubeOffsetX = 0.0 + bigOffset;
    cubeOffsetZ = 0.0 + bigOffset;
    var oldHalfSize = 1.0
    positions = positions.concat([
      -halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
      halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
      -halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, halfSize + cubeOffsetZ,
      halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, halfSize + cubeOffsetZ
    ]);
    cubeOffsetX = 2.0 * mazeWidth + bigOffset;
    cubeOffsetZ = 0.0 * mazeHeight + bigOffset;
    positions = positions.concat([
      -halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
      halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
      -halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, halfSize + cubeOffsetZ,
      halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, halfSize + cubeOffsetZ
    ]);
    cubeOffsetX = 4.0 * mazeWidth + bigOffset;
    cubeOffsetZ = 0.0 * mazeHeight + bigOffset;
    positions = positions.concat([
      -halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
      halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
      -halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, halfSize + cubeOffsetZ,
      halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, halfSize + cubeOffsetZ
    ]);
    cubeOffsetX = 4.0 * mazeWidth + bigOffset;
    cubeOffsetZ = 2.0 * mazeHeight + bigOffset;
    positions = positions.concat([
      -halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
      halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
      -halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, halfSize + cubeOffsetZ,
      halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, halfSize + cubeOffsetZ
    ]);
    cubeOffsetX = 4.0 * mazeWidth + bigOffset;
    cubeOffsetZ = 4.0 * mazeHeight + bigOffset;
    positions = positions.concat([
      -halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
      halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
      -halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, halfSize + cubeOffsetZ,
      halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, halfSize + cubeOffsetZ
    ]);
    cubeOffsetX = 2.0 * mazeWidth + bigOffset;
    cubeOffsetZ = 4.0 * mazeHeight + bigOffset;
    positions = positions.concat([
      -halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
      halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
      -halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, halfSize + cubeOffsetZ,
      halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, halfSize + cubeOffsetZ
    ]);
    cubeOffsetX = 0.0 * mazeWidth + bigOffset;
    cubeOffsetZ = 4.0 * mazeHeight + bigOffset;
    positions = positions.concat([
      -halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
      halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
      -halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, halfSize + cubeOffsetZ,
      halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, halfSize + cubeOffsetZ
    ]);
    cubeOffsetX = 0.0 * mazeWidth + bigOffset;
    cubeOffsetZ = 2.0 * mazeHeight + bigOffset;
    positions = positions.concat([
      -halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
      halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
      -halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, halfSize + cubeOffsetZ,
      halfSize + cubeOffsetX, oldHalfSize + cubeOffsetY, halfSize + cubeOffsetZ
    ]);
    halfSize = 1.0;
    for (i = 0; i < mazeWidth; i++) {
      for (j = 0; j < mazeHeight; j++) {
        cubeOffsetX = 2.0 * i + 2.0 * mazeWidth;
        cubeOffsetZ = 2.0 * j + 2.0 * mazeHeight;
        cubeOffsetY = randMaze[i][j] ? 0.0 : 2.0;//canvasMaze.getContext('2d').getImageData(i, j, 1, 1).data[0] == 255 ? 0.0 : 2.0;
        positions = positions.concat([
          -halfSize + cubeOffsetX, -halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, -halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          -halfSize + cubeOffsetX, -halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, -halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
          -halfSize + cubeOffsetX, -halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
          -halfSize + cubeOffsetX, -halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, -halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, -halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
          -halfSize + cubeOffsetX, -halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, -halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
          -halfSize + cubeOffsetX, -halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, -halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ
        ]);
      }
    }
    /*for (i = 0; i < mazeWidth; i++) {
      for (j = 0; j < mazeHeight; j++) {
        cubeOffsetX = 2.0 * i + 4.0 * mazeWidth;
        cubeOffsetZ = 2.0 * j + 2.0 * mazeHeight;
        positions = positions.concat([
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ
        ]);
      }
    }
    for (i = 0; i < mazeWidth; i++) {
      for (j = 0; j < mazeHeight; j++) {
        cubeOffsetX = 2.0 * i + 4.0 * mazeWidth;
        cubeOffsetZ = 2.0 * j + 4.0 * mazeHeight;
        positions = positions.concat([
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ
        ]);
      }
    }
    for (i = 0; i < mazeWidth; i++) {
      for (j = 0; j < mazeHeight; j++) {
        cubeOffsetX = 2.0 * i + 2.0 * mazeWidth;
        cubeOffsetZ = 2.0 * j + 4.0 * mazeHeight;
        positions = positions.concat([
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
        ]);
      }
    }
    for (i = 0; i < mazeWidth; i++) {
      for (j = 0; j < mazeHeight; j++) {
        cubeOffsetX = 2.0 * i;
        cubeOffsetZ = 2.0 * j + 4.0 * mazeHeight;
        positions = positions.concat([
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ
        ]);
      }
    }
    for (i = 0; i < mazeWidth; i++) {
      for (j = 0; j < mazeHeight; j++) {
        cubeOffsetX = 2.0 * i;
        cubeOffsetZ = 2.0 * j + 2.0 * mazeHeight;
        positions = positions.concat([
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
        ]);
      }
    }
    for (i = 0; i < mazeWidth; i++) {
      for (j = 0; j < mazeHeight; j++) {
        cubeOffsetX = 2.0 * i;
        cubeOffsetZ = 2.0 * j;
        positions = positions.concat([
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ
        ]);
      }
    }
    for (i = 0; i < mazeWidth; i++) {
      for (j = 0; j < mazeHeight; j++) {
        cubeOffsetX = 2.0 * i + 2.0 * mazeWidth;
        cubeOffsetZ = 2.0 * j;
        positions = positions.concat([
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ
        ]);
      }
    }
    for (i = 0; i < mazeWidth; i++) {
      for (j = 0; j < mazeHeight; j++) {
        cubeOffsetX = 2.0 * i + 4.0 * mazeWidth;
        cubeOffsetZ = 2.0 * j;
        positions = positions.concat([
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
          -halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
          halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ
        ]);
      }
    }
    var k;
    for (k = 0; k < 16; k++) {
      for (i = 0; i < mazeWidth; i++) {
        for (j = 0; j < mazeHeight; j++) {
          cubeOffsetX = 2.0 * i + 4.0 * mazeWidth;
          cubeOffsetZ = 2.0 * j;
          positions = positions.concat([
            -halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
            halfSize + cubeOffsetX, halfSize + cubeOffsetY, -halfSize + cubeOffsetZ,
            -halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ,
            halfSize + cubeOffsetX, halfSize + cubeOffsetY, halfSize + cubeOffsetZ
          ]);
        }
      }
    }*/
  }

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // Now set up the texture coordinates for the faces.

  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

  var t1 = 0.25, t2 = 0.5, t3 = 0.75;

  var textureCoordinates = [];
  {
    var i, j, k;
    textureCoordinates = textureCoordinates.concat([
      0.0, t2,
      1.0, t2,
      0.0, t3,
      1.0, t3,
      0.0, t2,
      1.0, t2,
      0.0, t3,
      1.0, t3,
      0.0, t2,
      1.0, t2,
      0.0, t3,
      1.0, t3,
      0.0, t2,
      1.0, t2,
      0.0, t3,
      1.0, t3,
      0.0, t2,
      1.0, t2,
      0.0, t3,
      1.0, t3,
      0.0, t2,
      1.0, t2,
      0.0, t3,
      1.0, t3,
      0.0, t2,
      1.0, t2,
      0.0, t3,
      1.0, t3,
      0.0, t2,
      1.0, t2,
      0.0, t3,
      1.0, t3
    ]);
    for (i = 0; i < mazeWidth; i++) {
      for (j = 0; j < mazeHeight; j++) {
        var topTex = randMaze[i][j] ? t1 : 0.0;//canvasMaze.getContext('2d').getImageData(i, j, 1, 1).data[0] == 255 ? t1 : 0.0;
        textureCoordinates = textureCoordinates.concat([
          1.0, t1,
          0.0, t1,
          1.0, 0.0,
          0.0, 0.0,
          0.0, t1,
          1.0, t1,
          0.0, 0.0,
          1.0, 0.0,
          1.0, t1,
          0.0, t1,
          1.0, 0.0,
          0.0, 0.0,
          1.0, t1,
          0.0, t1,
          1.0, 0.0,
          0.0, 0.0,
          1.0, 1.0,
          0.0, 1.0,
          1.0, t1,
          0.0, t1,
          0.0, topTex,
          1.0, topTex,
          0.0, t1 + topTex,
          1.0, t1 + topTex
        ]);
      }
    }
    /*for (k = 0; k < 24; k++) {
      for (i = 0; i < mazeWidth; i++) {
        for (j = 0; j < mazeHeight; j++) {
          textureCoordinates = textureCoordinates.concat([
            0.0, 0.5,
            1.0, 0.5,
            0.0, 1.0,
            1.0, 1.0
          ]);
        }
      }
    }*/
  }

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
    gl.STATIC_DRAW);

  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.

  var indices = [];
  {
    var i, j;
    for (i = 0; i < 8; i++) {
      indices = indices.concat([
        0 + 4 * i, 1 + 4 * i, 3 + 4 * i, 0 + 4 * i, 3 + 4 * i, 2 + 4 * i   // top
      ]);
    }
    var iPreConst = 32;
    for (i = 0; i < mazeWidth * mazeHeight; i++) {
      indices = indices.concat([
        0 + 24 * i + iPreConst, 1 + 24 * i + iPreConst, 3 + 24 * i + iPreConst, 0 + 24 * i + iPreConst, 3 + 24 * i + iPreConst, 2 + 24 * i + iPreConst,    // front
        4 + 24 * i + iPreConst, 5 + 24 * i + iPreConst, 6 + 24 * i + iPreConst, 5 + 24 * i + iPreConst, 7 + 24 * i + iPreConst, 6 + 24 * i + iPreConst,    // back
        8 + 24 * i + iPreConst, 9 + 24 * i + iPreConst, 11 + 24 * i + iPreConst, 8 + 24 * i + iPreConst, 11 + 24 * i + iPreConst, 10 + 24 * i + iPreConst,   // top
        12 + 24 * i + iPreConst, 13 + 24 * i + iPreConst, 15 + 24 * i + iPreConst, 12 + 24 * i + iPreConst, 15 + 24 * i + iPreConst, 14 + 24 * i + iPreConst,   // bottom
        16 + 24 * i + iPreConst, 17 + 24 * i + iPreConst, 19 + 24 * i + iPreConst, 16 + 24 * i + iPreConst, 19 + 24 * i + iPreConst, 18 + 24 * i + iPreConst,   // right
        20 + 24 * i + iPreConst, 21 + 24 * i + iPreConst, 23 + 24 * i + iPreConst, 20 + 24 * i + iPreConst, 23 + 24 * i + iPreConst, 22 + 24 * i + iPreConst,   // left
      ]);
    }
    //i =  mazeWidth * mazeHeight;

    /*for (j = 0; j < 24; j++) {
      for (i = mazeWidth * mazeHeight * (j + 1); i < (j + 2) * mazeWidth * mazeHeight; i++) {
        indices = indices.concat([
          4 * i, 4 * i + 1, 4 * i + 3, 4 * i, 4 * i + 3, 4 * i + 2   // top
        ]);
      }
    }*/
  }

  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    textureCoord: textureCoordBuffer,
    indices: indexBuffer,
  };
}

//
// Initialize a texture and load an image.
// When the image finished loading copy it into the texture.
//
function loadTexture(gl, url) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Because images have to be download over the internet
  // they might take a moment until they are ready.
  // Until then put a single pixel in the texture so we can
  // use it immediately. When the image has finished downloading
  // we'll update the texture with the contents of the image.
  const level = 0;
  const internalFormat = gl.RGBA;
  const width = 1;
  const height = 1;
  const border = 0;
  const srcFormat = gl.RGBA;
  const srcType = gl.UNSIGNED_BYTE;
  const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
  gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
    width, height, border, srcFormat, srcType,
    pixel);

  const image = new Image();
  image.onload = function () {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
      srcFormat, srcType, image);

    // WebGL1 has different requirements for power of 2 images
    // vs non power of 2 images so check if the image is a
    // power of 2 in both dimensions.
    if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
      // Yes, it's a power of 2. Generate mips.
      gl.generateMipmap(gl.TEXTURE_2D);
    } else {
      // No, it's not a power of 2. Turn of mips and set
      // wrapping to clamp to edge
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    }
  };
  image.src = url;

  return texture;
}

function isPowerOf2(value) {
  return (value & (value - 1)) == 0;
}

//
// Draw the scene.
//
function drawScene(gl, programInfo, buffers, texture, deltaTime) {
  gl.clearColor(0.0, 0.0, 0.0, 0.0);  // Clear to white, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 200.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
    fieldOfView,
    aspect,
    zNear,
    zFar);
  /*mat4.translate(projectionMatrix,     // destination matrix
                 projectionMatrix,     // matrix to translate
                 [2*XTranslation, 0, 2*ZTranslation]);  // amount to translate*/
  /*mat4.rotate(projectionMatrix,  // destination matrix
              projectionMatrix,  // matrix to rotate
              camRotationX,     // amount to rotate in radians
              [0.0, 1.0, 0.0]);
  mat4.rotate(projectionMatrix,  // destination matrix
              projectionMatrix,  // matrix to rotate
              camRotationY,     // amount to rotate in radians
              [1.0, 0.0, 0.0]);   */

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.
  /*mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [-3.0, -3.0, -6.0]);  // amount to translate*/
  /*mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              cubeRotation,     // amount to rotate in radians
              [0, 0, 1]);       // axis to rotate around (Z)
  mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              cubeRotation * .7,// amount to rotate in radians
              [0, 1, 0]);       // axis to rotate around (X)*/
  var xCoord = Math.cos(camRotationX * 1.0);
  var yCoord = Math.sin(camRotationX * 1.0);
  if (!floatCam) {
    XLookAt = xCoord + XTranslation;
    ZLookAt = yCoord + ZTranslation;
  }
  mat4.lookAt(modelViewMatrix,
    //[xCoord*2.0*ZTranslation+yCoord*2.0*XTranslation,0.0,yCoord*2.0*ZTranslation-xCoord*2.0*XTranslation],
    [XTranslation, YTranslation, ZTranslation],
    [XLookAt, YLookAt, ZLookAt],
    [0.0, 1.0, 0.0]);

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset);
    gl.enableVertexAttribArray(
      programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the texture coordinates from
  // the texture coordinate buffer into the textureCoord attribute.
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(
      programInfo.attribLocations.textureCoord,
      numComponents,
      type,
      normalize,
      stride,
      offset);
    gl.enableVertexAttribArray(
      programInfo.attribLocations.textureCoord);
  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix);
  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix);

  // Specify the texture to map onto the faces.

  // Tell WebGL we want to affect texture unit 0
  gl.activeTexture(gl.TEXTURE0);

  // Bind the texture to texture unit 0
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Tell the shader we bound the texture to textuše unit 0
  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

  {
    const vertexCount = 48 + 36 * mazeWidth * mazeHeight; //+ 10000;//+ 18 * 8 * mazeWidth * mazeHeight;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }
  var XZReal = 0.2;
  var XOffset = 1.0 - 2.0 * mazeWidth;
  var ZOffset = 1.0 - 2.0 * mazeHeight;
  var XReal = XTranslation + XOffset - XZReal;
  var ZReal = ZTranslation + ZOffset - XZReal;
  var XReal2 = XTranslation + XOffset + XZReal;
  var ZReal2 = ZTranslation + ZOffset + XZReal;
  if (floatCam) {
    var deltaX = XLookAt - XTranslation, deltaY = 0.0/*YLookAt - YTranslation*/, deltaZ = ZLookAt - ZTranslation;
    var deltaNorm = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
    deltaX /= deltaNorm;
    deltaY /= deltaNorm;
    deltaZ /= deltaNorm;
    var deltaSpeed = 2.0;
    XTranslation += deltaX * deltaTime * deltaSpeed;
    YTranslation += deltaY * deltaTime * deltaSpeed;
    ZTranslation += deltaZ * deltaTime * deltaSpeed;
    floatTime += deltaTime;
    if (floatTime > 30) {
      floatTime = 0.0;
      startAngle = Math.random() * 2.0 * Math.PI;
      floatCamHeight = 6.0;
      floatCamLookAtHeight = floatCamHeight - 12.0;
      ZTranslation = floatRadius * Math.sin(startAngle) + 3.0 * mazeHeight;
      XTranslation = floatRadius * Math.cos(startAngle) + 3.0 * mazeWidth;
      YTranslation = floatCamHeight;
      XLookAt = floatRadius * Math.cos(startAngle + Math.PI) + 3.0 * mazeWidth;
      ZLookAt = floatRadius * Math.sin(startAngle + Math.PI) + 3.0 * mazeHeight;
      YLookAt = floatCamLookAtHeight;
    }
    //floatRotation += deltaTime * 0.1;
    //XTranslation = floatRadius * Math.cos(floatRotation) + XLookAt;
    //ZTranslation = floatRadius * Math.sin(floatRotation) + ZLookAt;
  }
  else if (floatQuit) {
    floatQuit = false;
    ZTranslation = 2.0 + 2.0 * mazeHeight;
    XTranslation = 2.0 + 2.0 * mazeWidth;
    YTranslation = 2.0;
    YLookAt = 2.0;
    camRotationX = (randMaze[1][2] ? 90.0 : 0.0) / 360.0 * 2.0 * Math.PI;
    camRotationY = 0.0;
    var titleContainer = document.getElementById("title-container");
    titleContainer.style.display = "none";
    var bottomRightContainer = document.getElementById("parent-bottom-right");
    bottomRightContainer.style.display = "none";
    //bottomRightContainer.children[0].children[0].textContent = "Navigation";
    //bottomRightContainer.children[0].children[1].innerHTML = "Got lost? Press H to help you get to the end<br />Powered by the A* algorithm (coming soon)";
  }
  if (Math.floor((XReal + xCoord * 2.0 * deltaTime) / 2) < randMaze.length && Math.floor(ZReal / 2) < randMaze.length
    && Math.floor((XReal2 + xCoord * 2.0 * deltaTime) / 2) < randMaze.length && Math.floor(ZReal2 / 2) < randMaze.length
    && Math.floor((XReal + xCoord * 2.0 * deltaTime) / 2) < randMaze[0].length && Math.floor(ZReal / 2) < randMaze[0].length
    && Math.floor((XReal2 + xCoord * 2.0 * deltaTime) / 2) < randMaze[0].length && Math.floor(ZReal2 / 2) < randMaze[0].length) {
    if (WDown) {
      if (randMaze[Math.floor((XReal + xCoord * 2.0 * deltaTime) / 2)][Math.floor(ZReal / 2)]
        && randMaze[Math.floor((XReal + xCoord * 2.0 * deltaTime) / 2)][Math.floor(ZReal2 / 2)]
        && randMaze[Math.floor((XReal2 + xCoord * 2.0 * deltaTime) / 2)][Math.floor(ZReal / 2)]
        && randMaze[Math.floor((XReal2 + xCoord * 2.0 * deltaTime) / 2)][Math.floor(ZReal2 / 2)]) {
        XTranslation += xCoord * 2.0 * deltaTime;
      }
      if (randMaze[Math.floor(XReal / 2)][Math.floor((ZReal + yCoord * 2.0 * deltaTime) / 2)]
        && randMaze[Math.floor(XReal / 2)][Math.floor((ZReal2 + yCoord * 2.0 * deltaTime) / 2)]
        && randMaze[Math.floor(XReal2 / 2)][Math.floor((ZReal + yCoord * 2.0 * deltaTime) / 2)]
        && randMaze[Math.floor(XReal2 / 2)][Math.floor((ZReal2 + yCoord * 2.0 * deltaTime) / 2)]) {
        ZTranslation += yCoord * 2.0 * deltaTime;
      }
    }
    if (SDown) {
      if (randMaze[Math.floor((XReal - xCoord * 2.0 * deltaTime) / 2)][Math.floor(ZReal / 2)]
        && randMaze[Math.floor((XReal - xCoord * 2.0 * deltaTime) / 2)][Math.floor(ZReal2 / 2)]
        && randMaze[Math.floor((XReal2 - xCoord * 2.0 * deltaTime) / 2)][Math.floor(ZReal / 2)]
        && randMaze[Math.floor((XReal2 - xCoord * 2.0 * deltaTime) / 2)][Math.floor(ZReal2 / 2)]) {
        XTranslation -= xCoord * 2.0 * deltaTime;
      }
      if (randMaze[Math.floor(XReal / 2)][Math.floor((ZReal - yCoord * 2.0 * deltaTime) / 2)]
        && randMaze[Math.floor(XReal / 2)][Math.floor((ZReal2 - yCoord * 2.0 * deltaTime) / 2)]
        && randMaze[Math.floor(XReal2 / 2)][Math.floor((ZReal - yCoord * 2.0 * deltaTime) / 2)]
        && randMaze[Math.floor(XReal2 / 2)][Math.floor((ZReal2 - yCoord * 2.0 * deltaTime) / 2)]) {
        ZTranslation -= yCoord * 2.0 * deltaTime;
      }
    }
    if (DDown) {
      if (randMaze[Math.floor((XReal - yCoord * 2.0 * deltaTime) / 2)][Math.floor(ZReal / 2)]
        && randMaze[Math.floor((XReal - yCoord * 2.0 * deltaTime) / 2)][Math.floor(ZReal2 / 2)]
        && randMaze[Math.floor((XReal2 - yCoord * 2.0 * deltaTime) / 2)][Math.floor(ZReal / 2)]
        && randMaze[Math.floor((XReal2 - yCoord * 2.0 * deltaTime) / 2)][Math.floor(ZReal2 / 2)]) {
        XTranslation -= yCoord * 2.0 * deltaTime;
      }
      if (randMaze[Math.floor(XReal / 2)][Math.floor((ZReal + xCoord * 2.0 * deltaTime) / 2)]
        && randMaze[Math.floor(XReal / 2)][Math.floor((ZReal2 + xCoord * 2.0 * deltaTime) / 2)]
        && randMaze[Math.floor(XReal2 / 2)][Math.floor((ZReal + xCoord * 2.0 * deltaTime) / 2)]
        && randMaze[Math.floor(XReal2 / 2)][Math.floor((ZReal2 + xCoord * 2.0 * deltaTime) / 2)]) {
        ZTranslation += xCoord * 2.0 * deltaTime;
      }
    }
    if (ADown) {
      if (randMaze[Math.floor((XReal + yCoord * 2.0 * deltaTime) / 2)][Math.floor(ZReal / 2)]
        && randMaze[Math.floor((XReal + yCoord * 2.0 * deltaTime) / 2)][Math.floor(ZReal2 / 2)]
        && randMaze[Math.floor((XReal2 + yCoord * 2.0 * deltaTime) / 2)][Math.floor(ZReal / 2)]
        && randMaze[Math.floor((XReal2 + yCoord * 2.0 * deltaTime) / 2)][Math.floor(ZReal2 / 2)]) {
        XTranslation += yCoord * 2.0 * deltaTime;
      }
      if (randMaze[Math.floor(XReal / 2)][Math.floor((ZReal - xCoord * 2.0 * deltaTime) / 2)]
        && randMaze[Math.floor(XReal / 2)][Math.floor((ZReal2 - xCoord * 2.0 * deltaTime) / 2)]
        && randMaze[Math.floor(XReal2 / 2)][Math.floor((ZReal - xCoord * 2.0 * deltaTime) / 2)]
        && randMaze[Math.floor(XReal2 / 2)][Math.floor((ZReal2 - xCoord * 2.0 * deltaTime) / 2)]) {
        ZTranslation -= xCoord * 2.0 * deltaTime;
      }
    }
  }
  /*if (WDown) {
    if (canvasMaze.getContext('2d').getImageData
      ((XReal + xCoord * 2.0 * deltaTime) / 2, ZReal / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        ((XReal + xCoord * 2.0 * deltaTime) / 2, ZReal2 / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        ((XReal2 + xCoord * 2.0 * deltaTime) / 2, ZReal / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        ((XReal2 + xCoord * 2.0 * deltaTime) / 2, ZReal2 / 2, 1, 1).data[0] == 255) {
      XTranslation += xCoord * 2.0 * deltaTime;
    }
    if (canvasMaze.getContext('2d').getImageData
      (XReal / 2, (ZReal + yCoord * 2.0 * deltaTime) / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        (XReal / 2, (ZReal2 + yCoord * 2.0 * deltaTime) / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        (XReal2 / 2, (ZReal + yCoord * 2.0 * deltaTime) / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        (XReal2 / 2, (ZReal2 + yCoord * 2.0 * deltaTime) / 2, 1, 1).data[0] == 255) {
      ZTranslation += yCoord * 2.0 * deltaTime;
    }
  }
  if (SDown) {
    if (canvasMaze.getContext('2d').getImageData
      ((XReal - xCoord * 2.0 * deltaTime) / 2, ZReal / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        ((XReal - xCoord * 2.0 * deltaTime) / 2, ZReal2 / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        ((XReal2 - xCoord * 2.0 * deltaTime) / 2, ZReal / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        ((XReal2 - xCoord * 2.0 * deltaTime) / 2, ZReal2 / 2, 1, 1).data[0] == 255) {
      XTranslation -= xCoord * 2.0 * deltaTime;
    }
    if (canvasMaze.getContext('2d').getImageData
      (XReal / 2, (ZReal - yCoord * 2.0 * deltaTime) / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        (XReal / 2, (ZReal2 - yCoord * 2.0 * deltaTime) / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        (XReal2 / 2, (ZReal - yCoord * 2.0 * deltaTime) / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        (XReal2 / 2, (ZReal2 - yCoord * 2.0 * deltaTime) / 2, 1, 1).data[0] == 255) {
      ZTranslation -= yCoord * 2.0 * deltaTime;
    }
  }
  if (DDown) {
    if (canvasMaze.getContext('2d').getImageData
      ((XReal - yCoord * 2.0 * deltaTime) / 2, ZReal / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        ((XReal - yCoord * 2.0 * deltaTime) / 2, ZReal2 / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        ((XReal2 - yCoord * 2.0 * deltaTime) / 2, ZReal / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        ((XReal2 - yCoord * 2.0 * deltaTime) / 2, ZReal2 / 2, 1, 1).data[0] == 255) {
      XTranslation -= yCoord * 2.0 * deltaTime;
    }
    if (canvasMaze.getContext('2d').getImageData
      (XReal / 2, (ZReal + xCoord * 2.0 * deltaTime) / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        (XReal / 2, (ZReal2 + xCoord * 2.0 * deltaTime) / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        (XReal2 / 2, (ZReal + xCoord * 2.0 * deltaTime) / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        (XReal2 / 2, (ZReal2 + xCoord * 2.0 * deltaTime) / 2, 1, 1).data[0] == 255) {
      ZTranslation += xCoord * 2.0 * deltaTime;
    }
  }
  if (ADown) {
    if (canvasMaze.getContext('2d').getImageData
      ((XReal + yCoord * 2.0 * deltaTime) / 2, ZReal / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        ((XReal + yCoord * 2.0 * deltaTime) / 2, ZReal2 / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        ((XReal2 + yCoord * 2.0 * deltaTime) / 2, ZReal / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        ((XReal2 + yCoord * 2.0 * deltaTime) / 2, ZReal2 / 2, 1, 1).data[0] == 255) {
      XTranslation += yCoord * 2.0 * deltaTime;
    }
    if (canvasMaze.getContext('2d').getImageData
      (XReal / 2, (ZReal - xCoord * 2.0 * deltaTime) / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        (XReal / 2, (ZReal2 - xCoord * 2.0 * deltaTime) / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        (XReal2 / 2, (ZReal - xCoord * 2.0 * deltaTime) / 2, 1, 1).data[0] == 255
      && canvasMaze.getContext('2d').getImageData
        (XReal2 / 2, (ZReal2 - xCoord * 2.0 * deltaTime) / 2, 1, 1).data[0] == 255) {
      ZTranslation -= xCoord * 2.0 * deltaTime;
    }
  }*/
  if (aDown) {
    camRotationY -= deltaTime;
  }
  if (aUp) {
    camRotationY += deltaTime;
  }
  if (aLeft) {
    camRotationX -= deltaTime;
  }
  if (aRight) {
    camRotationX += deltaTime;
  }
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

