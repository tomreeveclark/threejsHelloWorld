import { 
    Scene, 
    BoxGeometry, 
    MeshBasicMaterial, 
    Mesh, 
    PerspectiveCamera, 
    WebGLRenderer } from 'three';

// 1 The scene
const scene = new Scene()

// 2 The Object
const geometry = new BoxGeometry(0.5, 0.5, 0.5);
const material = new MeshBasicMaterial( {color: 'orange'} );
const cubeMesh = new Mesh( geometry, material );
scene.add( cubeMesh );

// 3 The Camera
// const sizes = {
//     width: 1000,
//     height: 600,
// }

// Retrieve Canvas Element before called
const canvas = document.getElementById('three-canvas');

// Create New Camera
const camera = new PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight);
camera.position.z = 3;
scene.add( camera );

// Create Renderer

const renderer = new WebGLRenderer({ canvas });
renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);

// Add resize function
window.addEventListener('resize', () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight, false);
});

renderer.render(scene, camera);

// 6 Animation
const greenMaterial = new MeshBasicMaterial( {color: 0x00ff00} );
const blueMaterial = new MeshBasicMaterial( {color: 0x0000ff} );

const greenCube = new Mesh( geometry, greenMaterial );
greenCube.position.x += 1;

const blueCube = new Mesh( geometry, blueMaterial );
blueCube.position.x -= 1;

scene.add(greenCube);
scene.add(blueCube);

function animate() {
    cubeMesh.rotation.x += 0.01;
    cubeMesh.rotation.z += 0.01;

    greenCube.rotation.x += 0.015;
    greenCube.rotation.z += 0.015;

    blueCube.rotation.x += 0.005;
    blueCube.rotation.z += 0.005;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
 
animate();

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));