import * as THREE from 'three';
import { InputManager } from './InputManager';

export default class Entity extends THREE.Mesh {

  name = ''

  constructor() {
    super();
    this.receiveShadow = true;
    this.castShadow = true;
    this.isGrounded = false;
    this.model = null;
    this.inputs = new InputManager();
  }

  Create() { }

  Update(dt) { }
}