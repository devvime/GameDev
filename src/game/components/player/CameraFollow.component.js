import * as THREE from 'three';

export class CameraFollow {

  constructor(camera, player, options = {}) {

    this.camera = camera;
    this.player = player;

    this.offset = options.offset || new THREE.Vector3(0, 2.2, 5);
    this.smooth = options.smooth ?? 0.08;

    this.targetPos = new THREE.Vector3();
    this.lookTarget = new THREE.Vector3();
    this.lookHeight = options.lookHeight ?? 1.2;
  }

  update(dt) {
    this.targetPos.copy(this.player.position);
    this.targetPos.add(this.offset);
    this.camera.position.lerp(this.targetPos, this.smooth);

    this.lookTarget.copy(this.player.position);
    this.lookTarget.y += this.lookHeight;
    this.camera.lookAt(this.lookTarget);
  }
}