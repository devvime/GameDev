import * as THREE from 'three';

export class CharacterController {

  constructor(body, camera) {
    this.body = body;
    this.camera = camera;
    this.speed = 80;
    this.jump = 400;
  }

  update(input, delta) {

    const dir = new THREE.Vector3();

    if (input.forward) dir.z -= 1;
    if (input.backward) dir.z += 1;
    if (input.left) dir.x -= 1;
    if (input.right) dir.x += 1;

    dir.normalize();

    // movimento relativo à câmera
    dir.applyQuaternion(this.camera.quaternion);
    dir.y = 0;
    dir.normalize();

    this.body.rigidbody.velocity.x = dir.x * this.speed * delta;
    this.body.rigidbody.velocity.z = dir.z * this.speed * delta;

    if (input.jump && this.body.rigidbody.grounded) {
      this.body.rigidbody.velocity.y = this.jump * delta;
      this.body.rigidbody.grounded = false;
    }
  }
}
