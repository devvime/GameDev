import * as THREE from 'three';

export class AABB {

  constructor(entity, size = new THREE.Vector3(1, 1, 1), offset = new THREE.Vector3()) {
    this.entity = entity;
    this.size = size;
    this.offset = offset;

    this.min = new THREE.Vector3();
    this.max = new THREE.Vector3();
  }

  update() {
    const pos = this.entity.position.clone().add(this.offset);
    const half = this.size.clone().multiplyScalar(0.5);

    this.min.copy(pos).sub(half);
    this.max.copy(pos).add(half);
  }

  intersects(other) {
    return (
      this.min.x <= other.max.x && this.max.x >= other.min.x &&
      this.min.y <= other.max.y && this.max.y >= other.min.y &&
      this.min.z <= other.max.z && this.max.z >= other.min.z
    );
  }
}