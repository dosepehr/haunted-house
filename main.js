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

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: '#a9c388' })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

// lights

const ambientLight = new THREE.AmbientLight('#fff', 0.5);
scene.add(ambientLight);

const moonLight = new THREE.DirectionalLight('#fff', 0.5);
moonLight.position.set(4, 5, -2);

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

