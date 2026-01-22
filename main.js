import * as THREE from 'three';
//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { Text } from 'https://cdn.jsdelivr.net/npm/troika-three-text@0.47.0/+esm';

// Set up scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// set up controls
//const controls = new OrbitControls(camera, renderer.domElement);

// create canvas
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 256;

// make transparent
context.clearRect(0, 0, canvas.width, canvas.height);

// Draw text on canvas
const welcomeTextColor = '#4d1ae4';
context.fillStyle = welcomeTextColor;
context.font = 'Bold 64px Arial';
context.textAlign = 'center';
context.textBaseline = 'middle'; 
context.fillText('Welcome, visitor, to my personal website...', 256, 128);

const texture = new THREE.CanvasTexture(canvas);


const textMaterial = new THREE.MeshBasicMaterial({ 
  map: texture, 
  transparent: true,
  side: THREE.DoubleSide // Make it visible from both sides
});
const textGeometry = new THREE.PlaneGeometry(10, 5);
const textMesh = new THREE.Mesh(textGeometry, textMaterial);
textMesh.position.set(0, 8, 0);
scene.add(textMesh);


// set up texture loader
const textureLoader = new THREE.TextureLoader();
const bebeGebeTexture = textureLoader.load('uhkhj.jpeg');


// set up geometries and add
const geometry = new THREE.DodecahedronGeometry(5);
const material = new THREE.MeshBasicMaterial({color: 0xFF10F0, map: bebeGebeTexture});
const dodecahedron = new THREE.Mesh(geometry, material);
scene.add(dodecahedron);

// hue/text effects
let hue = 0;
let textOffset = 0;

// camera position
camera.position.z = 20;
scene.background = new THREE.Color(0xF3CFC6);

function animate() {

    requestAnimationFrame(animate);
    dodecahedron.rotation.x += 0.001;
    dodecahedron.rotation.y += 0.001;

    hue += 0.001;
    if (hue > 1) hue = 0;
    dodecahedron.material.color.setHSL(hue, 1, 0.5); // change dodecahedron color

    textOffset += 0.02;
    textMesh.position.y = 8 + Math.sin(textOffset) * 2; // make text float


    context.clearRect(0, 0, canvas.width, canvas.height);
    const textColor = new THREE.Color().setHSL(hue, 1, 0.5);
    context.fillStyle = `rgb(${textColor.r * 255}, ${textColor.g * 255}, ${textColor.b * 255})`;
    context.font = 'Bold 64px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText('welcome!', 256, 128);
    texture.needsUpdate = true; // Tell Three.js to update the texture

    renderer.render(scene, camera);
}

animate();
