// Ryan Butler
// CSCI 4250
// Due 10-24-19
// This project will display a scene with various objects including
// stars, a planet, mountains, a bow and arrow, a ghost, a bat, and tombstones.
// Then the bow and arrow can be rotated and fired at the ghost or bat

// Bonuses Attempted:
//  Pressing 'b' or 'B' resets the scene (5 points)
//  Added another Halloween target (bat) when 's' or 'S' is pressed (5 points)

var modelViewMatrix=mat4(); // identity
var modelViewMatrixLoc;
var projectionMatrix;
var projectionMatrixLoc;
var modelViewStack=[];
var program;

var points=[];
var colors=[];
var starLocation=[];
var starScale=[];

// used to check if ghost and bat should refresh location
var displayGhost = 0;
var displayBat = 0;
// used to rotate bow and arrow using l or r
var rotateBA = 0;

var cmtStack=[];

function main() {
    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    
    GeneratePoints();
    
    modelViewMatrix = mat4();
    projectionMatrix = ortho(-8, 8, -8, 8, -1, 1);
    
    initWebGL();
    
    document.onkeydown = keyFunction;//("keypress", keyFunction);
    
    render();
}

function initWebGL() {
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
    
    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
    
    var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW );
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    projectionMatrixLoc= gl.getUniformLocation(program, "projectionMatrix");
}

function scale4(a, b, c) {
    var result = mat4();
    result[0][0] = a;
    result[1][1] = b;
    result[2][2] = c;
    return result;
}

function GeneratePoints() {
    GeneratePlanet();
    GenerateGhost();
    GenerateBackground();
    GenerateStars();
    GenerateStarLocation();
    GenerateMountains();
    GenerateRings();
    GenerateBowArrow();
    GenerateTombstones();
    // Bonus Halloween Target, a bat
    GenerateBat();
}

function GeneratePlanet() {
    var Radius=1.0;
    var numPoints = 80;
    
    // TRIANGLE_FAN : for solid circle
    for( var i=0; i<numPoints; i++ ) {
        var Angle = i * (2.0*Math.PI/numPoints);
        var X = Math.cos( Angle )*Radius;
        var Y = Math.sin( Angle )*Radius;
        colors.push(vec4(0.7, 0.7, 0, 1));
        points.push(vec2(X, Y));
        
        // use 360 instead of 2.0*PI if // you use d_cos and d_sin
    }
}

function GenerateGhost() {
    // begin body  (87 points)
    points.push(vec2(3, 0));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(3.1, 1));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(3.5, 2));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(4, 3.6));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(4, 4));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(4.1, 3.3));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(4.5, 3));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(5.5, 3));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(6,3.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(6.5, 4));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(6.7, 4.2));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(6.8, 2.8));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(7, 2.4));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(7.5, 2));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(8, 2));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(8.5, 1.7));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(9, 1.2));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(10, 0.8));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(10, -2));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(10.4, -2.8));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(10.5, -3.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(10.7, -1.7));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(11, -1.4));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(11.2, -1.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(12, -2));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(12.5, -2.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(13, -3));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(13, -2));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(12.8, -0.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(12, 0));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(12.5, 0.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(11, 1));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(10.8, 1.4));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(10.2, 2.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(10, 4));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(9.8, 7.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(7.5, 9.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(6, 11));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(3, 12));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(.5, 15));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(0, 17));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-1.8, 17.4));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-4, 16.6));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-5, 14));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-6, 10.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-9, 10));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-10.5, 8.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-12, 7.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-12.5, 4.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-13, 3));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-13.5, -1));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-13, -2.3));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-12, 0));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-11.5, 1.8));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-11.5, -2));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-10.5, 0));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-10, 2));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-8.5, 4));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-8, 4.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-8.5, 7));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-8, 5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-6.5, 4.2));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-4.5, 6.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-4, 4));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-5.2, 2));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-5, 0));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-5.5, -2));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-6, -5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-7, -8));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-8, -10));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-9, -12.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-10, -14.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-10.5, -15.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-11, -17.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-5, -14));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-4, -11));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-5, -12.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-3, -12.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-2, -11.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(0, -11.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(1, -12));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(3, -12));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(3.5, -7));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(3, -4));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(4, -3.8));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(4.5, -2.5));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(3, 0));
    colors.push(vec4(1, 1, 1, 1));
    // end body
    
    // begin mouth (6 points)
    points.push(vec2(-1, 6));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-0.5, 7));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-0.2, 8));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-1, 8.6));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-2, 7));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-1.5, 5.8));
    colors.push(vec4(1, 1, 1, 1));
    // end mouth
    
    // begin nose (5 points)
    points.push(vec2(-1.8, 9.2));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-1, 9.8));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-1.1, 10.6));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-1.6, 10.8));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-1.9, 10));
    colors.push(vec4(1, 1, 1, 1));
    
    // begin left eye, translate (2.6, 0.2, 0) to draw the right eye
    // outer eye, draw line loop (9 points)
    points.push(vec2(-2.9, 10.8));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-2.2, 11));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-2, 12));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-2, 12.8));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-2.2, 13));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-2.5, 13));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-2.9, 12));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-3, 11));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-2.9, 10.5));
    colors.push(vec4(1, 1, 1, 1));
    
    // eye ball, draw triangle_fan (7 points)
    points.push(vec2(-2.5, 11.4));  // middle point
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-2.9, 10.8));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-2.2, 11));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-2, 12));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-2.9, 12));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-3, 11));
    colors.push(vec4(1, 1, 1, 1));
    points.push(vec2(-2.9, 10.5));
    colors.push(vec4(1, 1, 1, 1));
    // end left eye
}

function GenerateBackground() {
    // points for the sky
    points.push(vec2(-8, 8));
    colors.push(vec4(0.15, 0, 0.25, 1));
    points.push(vec2(8, 8));
    colors.push(vec4(0.2, 0, 0.3, 1));
    points.push(vec2(8, 0));
    colors.push(vec4(0.7, 0, 0.2, 1));
    points.push(vec2(-8, 0));
    colors.push(vec4(0.5, 0, 0.2, 1));
    
    // points for the ground
    points.push(vec2(-8, 0));
    colors.push(vec4(0.15, 0.45, 0, 1));
    points.push(vec2(-8, -8));
    colors.push(vec4(0.3, 0.25, 0, 1));
    points.push(vec2(8, -8));
    colors.push(vec4(0.3, 0.25, 0, 1));
    points.push(vec2(8, 0));
    colors.push(vec4(0.15, 0.45, 0, 1));
}

function GenerateStars() {
    // draw two triangle facing opposite directions
    points.push(vec2(-0.3, -0.3));
    colors.push(vec4(1, 1, 0.9, 1));
    points.push(vec2(0, 0.5));
    colors.push(vec4(1, 1, 0.9, 1));
    points.push(vec2(0.3, -0.3));
    colors.push(vec4(1, 1, 0.9, 1));
    points.push(vec2(-0.3, 0.3));
    colors.push(vec4(1, 1, 0.9, 1));
    points.push(vec2(0.3, 0.3));
    colors.push(vec4(1, 1, 0.9, 1));
    points.push(vec2(0, -0.5));
    colors.push(vec4(1, 1, 0.9, 1));
}

function GenerateStarLocation() {
    var setx, sety;
    for (var i=0; i<50; i++)
    {
        // dislplay in upper right of sky
        if (i<30)
            setx = Math.random() * 8;
        // display in upper left of sky
        else
            setx = Math.random() * -8;
        
        sety = Math.random() * 8;
        // keep in to 2/3 of the sky
        if (sety<2.66)
            sety += 2.66;
        
        starLocation.push(vec2(setx, sety));
        if (i%2 == 0)
            starScale.push(1/5);
        else
            starScale.push(1/7);
        
    }
}

function GenerateMountains() {
    points.push(vec2(-1, -1));
    colors.push(vec4(0.5, 0.35, 0, 1));
    points.push(vec2(0, 1));
    colors.push(vec4(0.15, 0.05, 0, 1));
    points.push(vec2(1, -1));
    colors.push(vec4(0.35, 0.15, 0, 1));
}

function GenerateRings() {
    var SIZE=50;
    var center = vec2(0, 0);
    var r = 0.5;
    var angle = 2*Math.PI/SIZE;
    
    // inner-most inner ring - red
    for (var i=0; i<SIZE; i++)
    {
        points.push([center[0]+r*Math.sin(i*angle), center[1]+r*Math.cos(i*angle)]);
        colors.push(vec4(0.75, 0.25, 0, 1));
    }
    // 2nd most inner ring - orange
    for (var i=0; i<SIZE; i++)
    {
        points.push([center[0]+r*Math.sin(i*angle), center[1]+r*Math.cos(i*angle)]);
        colors.push(vec4(0.8, 0.5, 0, 1));
    }
    // middle ring - yellow
    for (var i=0; i<SIZE; i++)
    {
        points.push([center[0]+r*Math.sin(i*angle), center[1]+r*Math.cos(i*angle)]);
        colors.push(vec4(0.75, 0.75, 0.25, 1));
    }
    // 2nd most outer ring - green
    for (var i=0; i<SIZE; i++)
    {
        points.push([center[0]+r*Math.sin(i*angle), center[1]+r*Math.cos(i*angle)]);
        colors.push(vec4(0.25, 1, 0.5, 1));
    }
    // outer-most ring - blue
    for (var i=0; i<SIZE; i++)
    {
        points.push([center[0]+r*Math.sin(i*angle), center[1]+r*Math.cos(i*angle)]);
        colors.push(vec4(0.25, 0.5, 1, 1));
    }
}

function GenerateBowArrow() {
    // points for right side of bow
    points.push(vec2(1.5, 0));
    colors.push(vec4(0.75, 0.5, 0, 1));
    points.push(vec2(1.25, 0));
    colors.push(vec4(0.75, 0.5, 0, 1));
    
    // arc of bow
    var SIZE=26;
    var center = vec2(0, 0);
    var r = 1.25;
    var angle = 2*Math.PI/SIZE;
    for (var i=0; i<SIZE/2+1; i++)
    {
        points.push([center[0]+r*Math.cos(i*angle), center[1]+r*Math.sin(i*angle)]);
        colors.push(vec4(0.75, 0.5, 0, 1));
    }
    
    // points for left side of bow
    points.push(vec2(-1.25, 0));
    colors.push(vec4(0.75, 0.5, 0, 1));
    points.push(vec2(-1.5, 0));
    colors.push(vec4(0.75, 0.5, 0, 1));
    
    // points for drawstring
    points.push(vec2(-1.25, 0));
    colors.push(vec4(0.75, 0.75, 0.75, 1));
    points.push(vec2(0, -1));
    colors.push(vec4(0.75, 0.75, 0.75, 1));
    points.push(vec2(1.25, 0));
    colors.push(vec4(0.75, 0.75, 0.75, 1));
    
    // points for arrowhead
    points.push(vec2(0, 1.25));
    colors.push(vec4(0.45, 0.45, 0.45, 1));
    points.push(vec2(-0.2, 1));
    colors.push(vec4(0.4, 0.4, 0.4, 1));
    points.push(vec2(0.2, 1));
    colors.push(vec4(0.75, 0.75, 0.75, 1));
    
    // points for arrow shaft
    points.push(vec2(0, 1));
    colors.push(vec4(0.45, 0.2, 0, 1));
    points.push(vec2(0, -1));
    colors.push(vec4(0.45, 0.2, 0, 1));
    
    // points for arrow fletching
    points.push(vec2(0, -0.8));
    colors.push(vec4(0.9, 0, 0, 1));
    points.push(vec2(-0.2, -1));
    colors.push(vec4(0.9, 0, 0, 1));
}

function GenerateTombstones() {
    // points for tombstone
    points.push(vec2(-1.5, 0));
    colors.push(vec4(0.5, 0.5, 0.5, 1));
    points.push(vec2(-1.5, -4.5));
    colors.push(vec4(0.2, 0.2, 0.2, 1));
    points.push(vec2(1.5, -4.5));
    colors.push(vec4(0.3, 0.3, 0.3, 1));
    points.push(vec2(1.5, 0));
    colors.push(vec4(0.45, 0.45, 0.45, 1));
    
    // top of tombstone
    var SIZE=26;
    var center = vec2(0, 0);
    var r = 1.5;
    var angle = 2*Math.PI/SIZE;
    for (var i=0; i<SIZE/2+1; i++)
    {
        points.push([center[0]+r*Math.cos(i*angle), center[1]+r*Math.sin(i*angle)]);
        colors.push(vec4(0.45, 0.45, 0.45, 1));
    }
}

// Bonus extra Halloween target, a bat
function GenerateBat() {
    points.push(vec2(0, 0.25));
    colors.push(vec4(0, 0, 0, 1));
    points.push(vec2(-0.2, 0.6));
    colors.push(vec4(0, 0, 0, 1));
    points.push(vec2(-0.3, 0.25));
    colors.push(vec4(0, 0, 0, 1));
    points.push(vec2(-1, 1));
    colors.push(vec4(0, 0, 0, 1));
    points.push(vec2(-1.5, 1.25));
    colors.push(vec4(0, 0, 0, 1));
    points.push(vec2(-1.25, 0));
    colors.push(vec4(0, 0, 0, 1));
    points.push(vec2(0, -1.25));
    colors.push(vec4(0, 0, 0, 1));
    points.push(vec2(1.25, 0));
    colors.push(vec4(0, 0, 0, 1));
    points.push(vec2(1.5, 1.25));
    colors.push(vec4(0, 0, 0, 1));
    points.push(vec2(1, 1));
    colors.push(vec4(0, 0, 0, 1));
    points.push(vec2(0.3, 0.23));
    colors.push(vec4(0, 0, 0, 1));
    points.push(vec2(0.2, 0.6));
    colors.push(vec4(0, 0, 0, 1));
    points.push(vec2(0, 0.25));
    colors.push(vec4(0, 0, 0, 1));
    points.push(vec2(-0.5, 0.25));
    colors.push(vec4(0, 0, 0, 1));
    points.push(vec2(0, -1.25));
    colors.push(vec4(0, 0, 0, 1));
}

/******************************************************
    Draw Points
 ******************************************************/


function DrawBackground() {
    gl.drawArrays(gl.TRIANGLE_FAN, 194, 4);
    gl.drawArrays(gl.TRIANGLE_FAN, 198, 4);
}

var ghostX, ghostY;
function DrawGhost() {
    modelViewStack.push(modelViewMatrix);
    var s = scale4(1/10, 1/10, 1);
    // translate to random location in upper half of the scene
    if (displayGhost == 0)
    {
        ghostX = Math.random();
        if (ghostX < 0.5)
            ghostX = Math.random() * 7;
        else
            ghostX = Math.random() * -7;
        
        ghostY = Math.random() * 6.5;
        displayGhost++;
    }
    var t = translate(ghostX, ghostY, 0);
    
    modelViewMatrix = mult(t, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays( gl.LINE_LOOP, 80, 87); // body
    gl.drawArrays( gl.LINE_LOOP, 167, 6);  // mouth
    gl.drawArrays( gl.LINE_LOOP, 173, 5);  // nose
    
    gl.drawArrays( gl.LINE_LOOP, 178, 9);  // left eye
    gl.drawArrays( gl.TRIANGLE_FAN, 187, 7);  // left eye ball
    
    modelViewMatrix=mult(modelViewMatrix, translate(2.6, 0, 0));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays( gl.LINE_STRIP, 178, 9);  // right eye
    gl.drawArrays( gl.TRIANGLE_FAN, 187, 7);  // right eye ball
    modelViewMatrix = modelViewStack.pop();
}

function DrawFullPlanet() {
    modelViewStack.push(modelViewMatrix);
    var t = translate(-4.25, 5.5, 0);
    var s = scale4(1, (2*1.618)/2, 1);
    modelViewMatrix = mult(t, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    // draw planet circle
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 80);
    modelViewMatrix = modelViewStack.pop();
}

function DrawBackRings() {
    var t, s, r;
    for (var i=0; i<5; i++)
    {
        modelViewStack.push(modelViewMatrix);
        t = translate(0.85, 6.8, 0);
        r = rotate(45, 0, 0, 1);
        s = scale4(4+(i/4), 1.25+(i/4), 1);
        modelViewMatrix = mult(r, mult(t, s));
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        gl.drawArrays(gl.LINE_LOOP, 211+(i*50), 50);
        modelViewMatrix = modelViewStack.pop();
    }
}

function DrawFrontRings() {
    var t, s, r;
    for (var i=0; i<5; i++)
    {
        modelViewStack.push(modelViewMatrix);
        t = translate(0.85, 6.8, 0);
        r = rotate(45, 0, 0, 1);
        s = scale4(4+(i/4), 1.25+(i/4), 1);
        modelViewMatrix = mult(r, mult(t, s));
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        gl.drawArrays(gl.LINE_STRIP, 221+(i*50), 30);
        modelViewMatrix = modelViewStack.pop();
    }
}

function DrawStars() {
    var t, s;
    for (var i=0; i<50; i++)
    {
        modelViewStack.push(modelViewMatrix);
        t = translate(starLocation[i][0], starLocation[i][1], 0);
        s = scale4(starScale[i], starScale[i], 1);
        modelViewMatrix = mult(t, s);
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        gl.drawArrays(gl.TRIANGLES, 202, 3);
        gl.drawArrays(gl.TRIANGLES, 205, 3);
        modelViewMatrix = modelViewStack.pop();
    }
}

function DrawMountains() {
    // 2nd mountain from the left
    modelViewStack.push(modelViewMatrix);
    var t = translate(2.25, 5.5, 0);
    var r = rotate(108, 0, 0, 1);
    var s = scale4(1.75, 3, 1);
    modelViewMatrix = mult(r, mult(t, s));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays(gl.TRIANGLES, 208, 3);
    modelViewMatrix = modelViewStack.pop();
    
    // right-most mountain
    modelViewStack.push(modelViewMatrix);
    t = translate(1, 0.65, 0);
    s = scale4(6, 1.5, 1);
    modelViewMatrix = mult(s, t);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays(gl.TRIANGLES, 208, 3);
    modelViewMatrix = modelViewStack.pop();
    
    // middle mountain mountain
    modelViewStack.push(modelViewMatrix);
    t = translate(-0.5, 0.65, 0);
    s = scale4(3.5, 3, 1);
    modelViewMatrix = mult(s, t);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays(gl.TRIANGLES, 208, 3);
    modelViewMatrix = modelViewStack.pop();
    
    // left-most mountain
    modelViewStack.push(modelViewMatrix);
    t = translate(1.1, 2.5, 0);
    r = rotate(117, 0, 0, 1);
    s = scale4(3, 2.5, 1);
    modelViewMatrix = mult(s, mult(r, t));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays(gl.TRIANGLES, 208, 3);
    modelViewMatrix = modelViewStack.pop();
    
    // 2nd from right mountain
    modelViewStack.push(modelViewMatrix);
    t = translate(-0.65, -0.85, 0);
    r = rotate(118, 0, 0, 1);
    s = scale4(2.65, 2.25, 1);
    modelViewMatrix = mult(s, mult(r, t));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays(gl.TRIANGLES, 208, 3);
    modelViewMatrix = modelViewStack.pop();
}

function DrawBow() {
    modelViewStack.push(modelViewMatrix);
    var t = translate(0, -6.25, 0);
    var s = scale4(1, 1, 1);
    // rotate using l or r
    var r = rotate(rotateBA, 0, 0, 1);
    
    modelViewMatrix = mult(s, r);
    modelViewMatrix = mult(t, modelViewMatrix);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays(gl.LINE_STRIP, 461, 21);
    modelViewMatrix = modelViewStack.pop();
}

function DrawArrow() {
    modelViewStack.push(modelViewMatrix);
    // Draw arrowhead
    var t = translate(0, -6.25, 0);
    var s = scale4(1, 1, 1);
    // rotate using l or r
    var r = rotate(rotateBA, 0, 0, 1);
    
    modelViewMatrix = mult(s, r);
    modelViewMatrix = mult(t, modelViewMatrix);
    
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.drawArrays(gl.TRIANGLES, 482, 3);
    
    // Draw arrow shaft
    gl.drawArrays(gl.LINE_STRIP, 485, 2);
    
    // Draw arrow fletching
    t = translate(0, -0.2, 0);
    modelViewMatrix = mult(modelViewMatrix, t);
    for (var i=0; i<3; i++)
    {
        t = translate(0, 0.15, 0);
        s = scale4(-1, 1, 1);
        
        // Left side fletching
        modelViewMatrix = mult(modelViewMatrix, t);
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        gl.drawArrays(gl.LINE_STRIP, 487, 2);
        
        // Right side fletching
        modelViewMatrix = mult(modelViewMatrix, s);
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        gl.drawArrays(gl.LINE_STRIP, 487, 2);
    }
    modelViewMatrix = modelViewStack.pop();
}

function DrawTombstone() {
    var t, s;
    for (var i=0; i<6; i++)
    {
        modelViewStack.push(modelViewMatrix);
        // Draw back row of tombstones, make slightly smaller
        if (i<3)
        {
            t = translate(9+(i*4), -3, 0);
            s = scale4(0.4, 0.4, 1);
            modelViewMatrix = mult(s, t);
        }
        // Draw front row of tombstones, make slightly larger and offset x-axis slightly
        else
        {
            t = translate(10+((i-3)*4), -6, 0);
            s = scale4(0.45, 0.45, 1);
            modelViewMatrix = mult(s, t);
        }
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        gl.drawArrays(gl.TRIANGLE_FAN, 489, 18);
        modelViewMatrix = modelViewStack.pop();
    }
}

var batX, batY;
function DrawBat() {
    modelViewStack.push(modelViewMatrix);
    var s = scale4(1/2,1/2,1/2);
    
    if (displayBat == 0)
    {
        batX = Math.random();
        if (batX < 0.5)
            batX = Math.random() * 7;
        else
            batX = Math.random() * -7;
        
        batY = Math.random() * 6.5;
        displayBat++;
    }
    var t = translate(batX, batY, 0);
    
    modelViewMatrix = mult(t, s);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    // Draw left point
    gl.drawArrays(gl.TRIANGLE_FAN, 507, 3);
    // Draw left wing
    gl.drawArrays(gl.TRIANGLE_FAN, 509, 5);
    // Draw right wing
    gl.drawArrays(gl.TRIANGLE_FAN, 513, 7);
    // Enclose body
    gl.drawArrays(gl.TRIANGLE_FAN, 519, 3);
    modelViewMatrix = modelViewStack.pop();
}

function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    
    DrawBackground();
    DrawStars();
    DrawMountains();
    DrawBackRings();
    DrawFullPlanet();
    DrawFrontRings();
    DrawTombstone();
    DrawBow();
    DrawArrow();
    
    // reset numbers to refire arrow
    stepCnt = 0;
    locationY = 0;
    locationX = 0;
}

var steps = 70;
var stepCnt = 0;
var locationX = 0;
var locationY = 0;

function fireArrow() {
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    
    DrawBackground();
    DrawStars();
    DrawMountains();
    DrawBackRings();
    DrawFullPlanet();
    DrawFrontRings();
    DrawTombstone();
    DrawBow();
    
    // draw ghost and bat
    DrawGhost();
    DrawBat();
    
    modelViewStack.push(modelViewMatrix);
    var angle = ((rotateBA*Math.PI)/180)+Math.PI/2;
    var dir = vec3(Math.cos(angle), Math.sin(angle), 0);
    
    var t = translate(0, -6.25, 0);
    var s = scale4(1, 1, 1);
    var r = rotate(rotateBA, 0, 0, 1);
    
    if (stepCnt < steps)
    {
        locationY += dir[1]*0.3;
        locationX += dir[0]*0.3;
    
        t = translate(locationX, -6.25+locationY, 0);
    
        modelViewMatrix = mult(s, t);
        modelViewMatrix = mult(modelViewMatrix, r);
        gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
        
        // Draw arrowhead
        gl.drawArrays(gl.TRIANGLES, 482, 3);
        // Draw arrow shaft
        gl.drawArrays(gl.LINE_STRIP, 485, 2);
        
        // Draw arrow fletching
        t = translate(0, -0.2, 0);
        modelViewMatrix = mult(modelViewMatrix, t);
        for (var i=0; i<3; i++)
        {
            t = translate(0, 0.15, 0);
            s = scale4(-1, 1, 1);
            
            // Left side fletching
            modelViewMatrix = mult(modelViewMatrix,t);
            gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
            gl.drawArrays(gl.LINE_STRIP, 487, 2);
            
            // Right side fletching
            modelViewMatrix = mult(modelViewMatrix,s);
            gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
            gl.drawArrays(gl.LINE_STRIP, 487, 2);
        }
        modelViewMatrix = modelViewStack.pop();
    
        stepCnt++;
        requestAnimationFrame(fireArrow);
    }
    else
    {
        render();
        displayGhost = 0;
        displayBat = 0;
    }
    
}

function keyFunction(k) {
    var key = String.fromCharCode(event.keyCode);
    if (k.key == 's' || key == 'S')
    {
        render();
        displayGhost = 0;
        DrawGhost();
        displayBat = 0;
        DrawBat();
    }
    // 37 is unicode for left arrow key
    else if (key == 'l' || key == 'L' || k.keyCode == '37')
    {
        rotateBA += 2;
        render();
        DrawGhost();
        DrawBat();
    }
    // 39 is unicode for right arrow key
    else if (key == 'r' || key == 'R' || k.keyCode == '39')
    {
        rotateBA += -2;
        render();
        DrawGhost();
        DrawBat();
    }
    else if (key == 'f' || key == 'F')
    {
        fireArrow();
    }
    
    // Bonus reset scene
    else if (key == 'b' || key == 'B')
    {
        rotateBA = 0;
        render();
    }
}
