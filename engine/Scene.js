import * as THREE from 'three';
import { Camera } from './Camera';
import SkyBox from './Skybox';

export default class Scene extends THREE.Scene {

  name = "DefaultScene";
  sky = new SkyBox();
  sun = new THREE.DirectionalLight();
  ambientLight = new THREE.AmbientLight();
  objects = {};

  constructor() {
    super();
    this.SetWorld();
    this.camera = Camera;
    this.camera.position.set(0, 2, 5);
  }

  SetWorld() {
    this.fog = new THREE.Fog(0x5c4740, 10, 50);

    this.sun.position.set(1, 2, 3);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.width = 1024;
    this.sun.shadow.mapSize.height = 1024;

    this.ambientLight.intensity = 0.5

    this.add(this.sky);
    this.add(this.sun);
    this.add(this.ambientLight);
  }

}