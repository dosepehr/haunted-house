import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

const canvas = document.querySelector('.webgl');

const sizes = {
    w: window.innerWidth,
    h: window.innerHeight,
};
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sizes.w / sizes.h);
camera.position.set(4, 2, 5);
scene.add(camera);
/**
 * floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: '#a9c388' })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * house
 */
const house = new THREE.Group();
scene.add(house);
// walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({ color: '#ac8e82' })
);
walls.position.y = 2.5 / 2;
house.add(walls);

// lights

const ambientLight = new THREE.AmbientLight('#fff', 0.5);
scene.add(ambientLight);

const moonLight = new THREE.DirectionalLight('#fff', 0.5);
moonLight.position.set(4, 5, -2);
scene.add(moonLight);

/**
 * debug
 */
const gui = new dat.GUI();

const ambientLightFolder = gui.addFolder('ambient light');
const moonLightfolder = gui.addFolder('moon light');
ambientLightFolder.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
moonLightfolder.add(moonLight, 'intensity').min(0).max(1).step(0.001);
moonLightfolder.add(moonLight.position, 'x').min(0).max(5).step(0.001);
moonLightfolder.add(moonLight.position, 'y').min(0).max(5).step(0.001);
moonLightfolder.add(moonLight.position, 'z').min(-2).max(5).step(0.001);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.w, sizes.h);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
};

animate();

