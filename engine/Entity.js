import * as THREE from 'three';
import { Rigidbody } from './physics/Rigidbody';
import { AABB } from './physics/Aabb';
import { World } from '../engine/physics/PhysicsWorld';
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

  SetCollider({ size = new THREE.Vector3(1, 1, 1), offset = new THREE.Vector3(), isStatic = false }) {
    this.rigidbody = new Rigidbody(this, isStatic);
    this.collider = new AABB(this, size, offset);
    World.add(this);
  }

  Create() { }

  Update(dt) { }
}