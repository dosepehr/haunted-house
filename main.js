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
// roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
);
roof.position.y = 2.5 + 0.5;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);
// door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshStandardMaterial({ color: 'red' })
);
door.position.y = 1;
door.position.z = 2 + 0.01;
house.add(door);

// bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.1);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

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

