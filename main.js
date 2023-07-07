import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

const sizes = {
    w: window.innerWidth,
    h: window.innerHeight,
};
const scene = new THREE.Scene();
const camera = new THREE.Camera(75, sizes.w / sizes.h);
scene.add(camera);

