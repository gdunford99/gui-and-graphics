var gl = null;
var cone = null;
var angle = 60;

function init() {
    var canvas = document.getElementById( "webgl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    cone = new Cone (gl, 8);
    
    if ( !gl ) {
        alert("Unable to setup WebGL");
        return;
    }

    //gl.clearColor( 1.0, 0.0, 1.0, 1.0 );

    render();
}

function render() {
	
   cone.render();
	
	
    //gl.clear( gl.COLOR_BUFFER_BIT );
    
}

window.onload = init;
