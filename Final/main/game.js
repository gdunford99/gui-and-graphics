			
			//Grant Dunford
			
			import * as THREE from '../build/three.module.js';

			let camera, scene, renderer;
			let mesh;
			

			
			
			let AMOUNT = 1;

			init();
			animate();

			function init() {
				
				
				
				const ASPECT_RATIO = window.innerWidth / window.innerHeight;

				const WIDTH = ( window.innerWidth / AMOUNT ) * window.devicePixelRatio;
				const HEIGHT = ( window.innerHeight / AMOUNT ) * window.devicePixelRatio;

				const cameras = [];

				for ( let y = 0; y < AMOUNT; y ++ ) {

					for ( let x = 0; x < AMOUNT; x ++ ) {

						const subcamera = new THREE.PerspectiveCamera( 80, ASPECT_RATIO, 0.1, 50 );
						subcamera.viewport = new THREE.Vector4( Math.floor( x * WIDTH ), Math.floor( y * HEIGHT ), Math.ceil( WIDTH ), Math.ceil( HEIGHT ) );
						subcamera.position.x = ( x / AMOUNT ) - 0.5;
						subcamera.position.y = 0.5 - ( y / AMOUNT );
						subcamera.position.z = 1.5;
						subcamera.position.multiplyScalar( 2 );
						subcamera.lookAt( 0, 0, 0 );
						subcamera.updateMatrixWorld();
						cameras.push( subcamera );

					}

				}

				camera = new THREE.ArrayCamera( cameras );
				camera.position.z = 3;

				scene = new THREE.Scene();

				scene.add( new THREE.AmbientLight( 0x222244 ) );

				const light = new THREE.DirectionalLight();
				light.position.set( 0.5, 0.5, 1 );
				light.castShadow = true;
				light.shadow.camera.zoom = 4; // tighter shadow map
				scene.add( light );
				
				//loads background texture and repeats it
				const backgroundTexture = new THREE.TextureLoader().load( "../textures/background1.png" );
				backgroundTexture.wrapS = THREE.RepeatWrapping;
				backgroundTexture.wrapT = THREE.RepeatWrapping;
				backgroundTexture.repeat.set( 20, 20 );
				
				//creates background 
				const geometryBackground = new THREE.PlaneGeometry( 100, 100 );
				const materialBackground = new THREE.MeshPhongMaterial( { color: 0xffffff, map: backgroundTexture } );
				const background = new THREE.Mesh( geometryBackground, materialBackground );
				background.receiveShadow = true;
				background.position.set( 0, 0, - 1 );
				scene.add( background );
				
				
				const coinTexture = new THREE.TextureLoader().load( "../textures/coin1.png" );
				coinTexture.wrapS = THREE.RepeatWrapping;
				coinTexture.wrapT = THREE.RepeatWrapping;
				coinTexture.repeat.set( 1, 1 );
				

				//coin
				const geometryCylinder = new THREE.CylinderGeometry( 0.75, 0.75, 0.1, 32 );
				const materialCylinder = new THREE.MeshPhysicalMaterial( { map: coinTexture , metalness: 0.2, envMapIntensity: 0.1, roughness: 0, } );
				geometryCylinder.translate(-2.75, 0, 0);
				geometryCylinder.scale(0.65, 0.65, 0.65);
				mesh = new THREE.Mesh( geometryCylinder, materialCylinder );
				scene.add( mesh );
				
				var diceTexture = new THREE.TextureLoader().load("../textures/dice1.png");
				
				//adds cube/dice to scene
				var cubeGeometry = new THREE.BoxGeometry();
				var cubeMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff, map: diceTexture } );
				var cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
				cube.receiveShadow = true;
				cubeGeometry.translate(-.5, 1, 0);
				scene.add( cube );
				
				//loads wood texture onto the chess pawn
				const woodTexture = new THREE.TextureLoader().load( "../textures/wood1.jpg" );
				woodTexture.wrapS = THREE.RepeatWrapping;
				woodTexture.wrapT = THREE.RepeatWrapping;
				woodTexture.repeat.set( 4, 4 );
				
				
				//bottom of the pawn
				const pawnBottomGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32);
				const pawnBottomMat = new THREE.MeshBasicMaterial ( { color: 0xffffff, map: woodTexture} );
				const pawnBottom = new THREE.Mesh(pawnBottomGeo, pawnBottomMat);
				pawnBottomGeo.translate(1,0.4,0);
				scene.add(pawnBottom);
				
				//middle of the pawn
				const pawnMidGeo = new THREE.CylinderGeometry(0.1, 0.5, 1, 32);
				const pawnMidMat = new THREE.MeshBasicMaterial ( { color: 0xffffff, map: woodTexture} );
				const pawnMiddle = new THREE.Mesh(pawnMidGeo, pawnMidMat);
				pawnMidGeo.translate(1, 0.9, 0);
				scene.add(pawnMiddle);
				
				//top of the pawn		
				const pawnTopGeo = new THREE.OctahedronGeometry (.2, 10);
				const pawnTopMat = new THREE.MeshBasicMaterial ( { color: 0xffffff, map: woodTexture} );
				const pawnTop = new THREE.Mesh (pawnTopGeo, pawnTopMat);
				pawnTopGeo.translate(1, 1.55, 0);
				scene.add(pawnTop);

				//loading texture for dart tip
				const dartTipTexture = new THREE.TextureLoader().load( "../textures/metal.jpg" );
				dartTipTexture.wrapS = THREE.RepeatWrapping;
				dartTipTexture.wrapT = THREE.RepeatWrapping;
				dartTipTexture.repeat.set( 1, 1 );
				
				//texture for dart shaft
				const dartMidTexture = new THREE.TextureLoader().load( "../textures/shaft.jpg" );
				dartMidTexture.wrapS = THREE.RepeatWrapping;
				dartMidTexture.wrapT = THREE.RepeatWrapping;
				dartMidTexture.repeat.set( 1, 1 );

				//texture for dart fin
				const dartFinTexture = new THREE.TextureLoader().load( "../textures/fin.jpg" );
				dartFinTexture.wrapS = THREE.RepeatWrapping;
				dartFinTexture.wrapT = THREE.RepeatWrapping;
				dartFinTexture.repeat.set( 1, 1 );


				//dart tip
				const dartTipGeo = new THREE.ConeGeometry(0.1, 0.7, 10);
				const dartTipMat = new THREE.MeshBasicMaterial ( {color: 0xffffff, map: dartTipTexture} );
				const dartTip = new THREE.Mesh(dartTipGeo, dartTipMat);
				dartTipGeo.translate (-1, -0.25, 1);
				dartTip.rotateX(THREE.Math.degToRad(90));
				dartTip.rotateZ(THREE.Math.degToRad(90));
				scene.add(dartTip);
				
				//dart shaft
				const dartMidGeo = new THREE.CylinderGeometry (0.1, 0.035, 2, 32);
				const dartMidMat = new THREE.MeshBasicMaterial( {color: 0xffffff, map:dartMidTexture} );
				const dartMid = new THREE.Mesh(dartMidGeo, dartMidMat);
				dartMidGeo.translate(-1, -1.6, 1);
				dartMid.rotateX(THREE.Math.degToRad(90));
				dartMid.rotateZ(THREE.Math.degToRad(90));
				scene.add(dartMid);
				
				//dart fin 1
				const dartFinOneGeo = new THREE.PlaneGeometry(0.15, 1, 1);
				const dartFinMat = new THREE.MeshBasicMaterial ( {color: 0xffffff, map: dartFinTexture} );
				const dartFinOne = new THREE.Mesh(dartFinOneGeo, dartFinMat);
				dartFinOneGeo.translate (1.4, -0.1, 0.43); 
				dartFinOne.rotateX(THREE.Math.degToRad(45));
				scene.add(dartFinOne);
				
				//dart fin 2
				const dartFinTwoGeo = new THREE.PlaneGeometry(0.15, 0.75, 1);
				const dartFinTwo = new THREE.Mesh(dartFinTwoGeo, dartFinMat);
				dartFinTwoGeo.translate (1.2, -0.5, 0.1); 
				dartFinTwo.rotateX(THREE.Math.degToRad(-45));
				scene.add(dartFinTwo);

				//lighter wood texture loader
				const lightWoodTexture = new THREE.TextureLoader().load("../textures/lightWood.jpg");
				lightWoodTexture.wrapS = THREE.RepeatWrapping;
				lightWoodTexture.wrapT = THREE.RepeatWrapping;
				lightWoodTexture.repeat.set( 2, 1 );
			
				//leftmost bottom block
				const botBlockOneGeo = new THREE.BoxGeometry();
				const botBlockMat = new THREE.MeshBasicMaterial ( { color: 0xffffff, map: lightWoodTexture} );
				const botBlockOne = new THREE.Mesh(botBlockOneGeo, botBlockMat);
				botBlockOneGeo.translate(-6, -2, 0);
				botBlockOneGeo.scale(0.25, 0.75, 0.25);
				botBlockOne.castShadow = true;
				botBlockOne.receiveShadow = true;
				scene.add(botBlockOne);
				
				//middle bottom block
				const botBlockTwoGeo = new THREE.BoxGeometry();
				const botBlockTwo = new THREE.Mesh(botBlockTwoGeo, botBlockMat);
				botBlockTwoGeo.translate(-4, -2, 0);
				botBlockTwoGeo.scale(0.25, 0.75, 0.25);
				botBlockTwo.castShadow = true;
				botBlockTwo.receiveShadow = true;
				scene.add(botBlockTwo);
				
				//right bottom block
				const botBlockThreeGeo = new THREE.BoxGeometry();				
				const botBlockThree = new THREE.Mesh(botBlockThreeGeo, botBlockMat);
				botBlockThreeGeo.translate(-2, -2, 0);
				botBlockThreeGeo.scale(0.25, 0.75, 0.25);
				botBlockThree.castShadow = true;
				botBlockThree.receiveShadow = true;
				scene.add(botBlockThree);
				
				//left middle block
				const midBlockOneGeo = new THREE.BoxGeometry();				
				const midBlockOne = new THREE.Mesh(midBlockOneGeo, botBlockMat);
				midBlockOneGeo.translate(-4, 1.8, 0);
				midBlockOneGeo.scale(0.25, 0.75, 0.25);
				midBlockOneGeo.rotateZ(THREE.Math.degToRad(90));
				midBlockOne.castShadow = true;
				midBlockOne.receiveShadow = true;
				scene.add(midBlockOne);
				
				//right middle block
				const midBlockTwoGeo = new THREE.BoxGeometry();				
				const midBlockTwo = new THREE.Mesh(midBlockTwoGeo, botBlockMat);
				midBlockTwoGeo.translate(-4, 0.8, 0);
				midBlockTwoGeo.scale(0.25, 0.75, 0.25);
				midBlockTwoGeo.rotateZ(THREE.Math.degToRad(90));
				midBlockTwo.castShadow = true;
				midBlockTwo.receiveShadow = true;
				scene.add(midBlockTwo);
				
				//upper left block
				const upBlockOneGeo = new THREE.BoxGeometry();
				const upBlockOne = new THREE.Mesh(upBlockOneGeo, botBlockMat);
				upBlockOneGeo.translate(-5, -1.25, 0);
				upBlockOneGeo.scale(0.25, 0.55, 0.25);
				upBlockOne.castShadow = true;
				upBlockOne.receiveShadow = true;
				scene.add(upBlockOne);
				
				//upper right block
				const upBlockTwoGeo = new THREE.BoxGeometry();
				const upBlockTwo = new THREE.Mesh(upBlockTwoGeo, botBlockMat);
				upBlockTwoGeo.translate(-3, -1.25, 0);
				upBlockTwoGeo.scale(0.25, 0.55, 0.25);
				upBlockTwo.castShadow = true;
				upBlockTwo.receiveShadow = true;
				scene.add(upBlockTwo);
				
				//top mid block
				const upMidBlockGeo = new THREE.BoxGeometry();				
				const upMidBlock = new THREE.Mesh(upMidBlockGeo, botBlockMat);
				upMidBlockGeo.translate(-1, 1.85, 0);
				upMidBlockGeo.scale(0.25, 0.55, 0.25);
				upMidBlockGeo.rotateZ(THREE.Math.degToRad(90));
				upMidBlock.castShadow = true;
				upMidBlock.receiveShadow = true;
				scene.add(upMidBlock);
				
				//renderer
				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.shadowMap.enabled = true;
				document.body.appendChild( renderer.domElement );

				
				window.addEventListener( 'resize', onWindowResize );
				
				
				var rollResult = document.getElementById("result");
				
				//loading textures for dice changing 
				var diceOne = THREE.ImageUtils.loadTexture( "../textures/dice1.png" ); 
				var diceTwo = THREE.ImageUtils.loadTexture( "../textures/dice2.png" ); 
				var diceThree = THREE.ImageUtils.loadTexture( "../textures/dice3.png" ); 
				var diceFour = THREE.ImageUtils.loadTexture( "../textures/dice4.png" ); 
				var diceFive = THREE.ImageUtils.loadTexture( "../textures/dice5.png" ); 	
				var diceSix = THREE.ImageUtils.loadTexture( "../textures/dice6.png" ); 
				
				
				//gets a random number between 1 and 6 when clicked 
				function rollDice() {
					let roll = Math.floor(Math.random() * 6) + 1;
					rollResult.innerText = roll;
					
					//changes texture of dice depending on the roll
					if (roll == 1){
						cubeMaterial.map = diceOne;
						cubeMaterial.needsUpdate = true;
					}
					else if (roll == 2){
						cubeMaterial.map = diceTwo;
						cubeMaterial.needsUpdate = true;
					}
					else if (roll == 3){
						cubeMaterial.map = diceThree;
						cubeMaterial.needsUpdate = true;
					}
					else if (roll == 4){
						cubeMaterial.map = diceFour;
						cubeMaterial.needsUpdate = true;
					}
					else if (roll == 5){
						cubeMaterial.map = diceFive;
						cubeMaterial.needsUpdate = true;
					}
					else if (roll == 6){
						cubeMaterial.map = diceSix;
						cubeMaterial.needsUpdate = true;
					}
					
				}

				//event to wait for click
				rollResult.addEventListener("click", rollDice);

			}
			
					

			function onWindowResize() {

				const ASPECT_RATIO = window.innerWidth / window.innerHeight;
				const WIDTH = ( window.innerWidth / AMOUNT ) * window.devicePixelRatio;
				const HEIGHT = ( window.innerHeight / AMOUNT ) * window.devicePixelRatio;

				camera.aspect = ASPECT_RATIO;
				camera.updateProjectionMatrix();

				for ( let y = 0; y < AMOUNT; y ++ ) {

					for ( let x = 0; x < AMOUNT; x ++ ) {

						const subcamera = camera.cameras[ AMOUNT * y + x ];

						subcamera.viewport.set(
							Math.floor( x * WIDTH ),
							Math.floor( y * HEIGHT ),
							Math.ceil( WIDTH ),
							Math.ceil( HEIGHT ) );

						subcamera.aspect = ASPECT_RATIO;
						subcamera.updateProjectionMatrix();

					}

				}

				renderer.setSize( window.innerWidth, window.innerHeight );

			}
			
			//animation function that animates coin flipping
			function animate() {

				mesh.rotation.x += 0.02;
				
			

				renderer.render( scene, camera );

				requestAnimationFrame( animate );
				
				

			}