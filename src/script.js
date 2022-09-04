import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

// Loading
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load('/texture/NormalMap.jpg');

// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereGeometry(0.9, 32, 16);

const geometry2 = new THREE.IcosahedronGeometry(1.6, 1);

// Materials

const material = new THREE.MeshStandardMaterial();
// material.roughness = 0.5;
// material.metalness = 0.3;
// material.normalMap = normalTexture;

material.color = new THREE.Color(0x000000);
material.wireframe = true;
// material.flatShading = true;

const material2 = new THREE.MeshStandardMaterial();
material.color = new THREE.Color(0xffffff);

material2.wireframe = true;
// material2.flatShading = true;

// Mesh
const sphere = new THREE.Mesh(geometry, material);
sphere.position.set(1, 0.5, 1.5);

const cube = new THREE.Mesh(geometry2, material2);
cube.position.set(-1.6, -0.9, -0.4);

scene.add(sphere);
scene.add(cube);

// Lights
// controller
const setLight = (light, name) => {
  // set the name
  name = gui.addFolder(`${name}`);
  // set position
  name.add(light.position, 'x').min(-6).max(6).step(0.1);
  name.add(light.position, 'y').min(-3).max(3).step(0.1);
  name.add(light.position, 'z').min(-3).max(3).step(0.1);
  name.add(light, 'intensity').min(0).max(10).step(0.1);
  const pointLightHelper = new THREE.PointLightHelper(light, 1);
  // set color
  const lightColor = {
    color: 0xff0000,
  };
  name.addColor(lightColor, 'color').onChange(() => {
    light.color.set(lightColor.color);
  });
  scene.add(pointLightHelper);
};

// single light
const pointLight1 = new THREE.PointLight(0xff77);
pointLight1.position.set(-2.4, 0.2, -0.3);
pointLight1.intensity = 2;
scene.add(pointLight1);
// control (uncomment to take control)
// setLight(pointLight1, 'light 1');
// end of single light

// single light
const pointLight2 = new THREE.PointLight(0xb3ff00);
pointLight2.position.set(1.6, -2.8, -1.1);
pointLight2.intensity = 2.5;
scene.add(pointLight2);
// control (uncomment to take control)
// setLight(pointLight2, 'light2');
// end of single light

// single light
const pointLight3 = new THREE.PointLight(0xaa00);
pointLight3.position.set(0.7, 1.9, -0.7);
pointLight3.intensity = 3;
scene.add(pointLight3);
// control (uncomment to take control)
// setLight(pointLight3, 'light3');
// end of single light

// single light
// const pointLight4 = new THREE.PointLight(0xaa00);
// pointLight4.position.set(0.7, 1.9, -0.7);
// pointLight4.intensity = 3;
// scene.add(pointLight4);
// // control (uncomment to take control)
// setLight(pointLight4, 'light4');
// end of single light

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2.5;
scene.add(camera);

// Controls

// TOGGLE TISH ONE!

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

// scroll control
// document.addEventListener('click', onScroll);

// function onScroll(event) {
//   cube.position.y = window.scrollY * 0.005;
// }

// controlls
const controls = new OrbitControls(camera, renderer.domElement);
// controls.enabled = false;

// mouse control
document.addEventListener('mousemove', onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

// end of mouse control
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  // Update objects
  sphere.rotation.y = 0.1 * elapsedTime;
  sphere.rotation.x = 0.1 * elapsedTime;
  sphere.rotation.z = 0.1 * elapsedTime;

  // sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
  // sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x);
  // sphere.rotation.z += 0.5 * (targetY - sphere.rotation.x);

  cube.rotation.y = 0.1 * elapsedTime;
  cube.rotation.x = 0.1 * elapsedTime;
  cube.rotation.z = 0.1 * elapsedTime;

  cube.rotation.y += 0.5 * (targetX - cube.rotation.y);
  cube.rotation.x += 0.5 * (targetY - cube.rotation.x);
  cube.rotation.z += 0.5 * (targetY - cube.rotation.x);
  // Update Orbital Controls
  // controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// !!!!!ui design!!!!!
const animetedType = document.querySelector('.animate-type');
animetedType.textContent = '<Web Developer/>';

// toggle btn

const toggleBtn = document.querySelector('.toggle-btn');
const toggle = document.querySelector('.toggle');
const toggleTxt = document.querySelector('.btn-txt');
toggleBtn.addEventListener('click', () => {
  toggle.classList.toggle('toggle-on');
  if (toggleTxt.textContent == 'on') {
    toggleTxt.textContent = 'off';
    controls.enabled = false;
  } else {
    toggleTxt.textContent = 'on';
    controls.enabled = true;
  }
});
