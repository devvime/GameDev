import * as THREE from 'three';

export class Rigidbody {

  constructor(entity, isStatic) {
    this.static = isStatic;
    this.entity = entity;

    this.velocity = new THREE.Vector3();
    this.gravity = -20;
    this.grounded = false;
  }

  applyGravity(delta) {
    if (!this.grounded)
      if (!this.static)
        this.velocity.y += this.gravity * delta;
  }
}