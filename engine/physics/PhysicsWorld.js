import * as THREE from 'three';

class PhysicsWorld {

  constructor() {
    this.bodies = [];
  }

  add(body) {
    this.bodies.push(body);
    this.debugMeshes = [];
    this.debugEnabled = false;
  }

  enableDebug(scene) {
    this.debugEnabled = true;
    for (const body of this.bodies) {
      const geometry = new THREE.BoxGeometry(
        body.collider.size.x,
        body.collider.size.y,
        body.collider.size.z
      );
      const edges = new THREE.EdgesGeometry(geometry);
      const material = new THREE.LineBasicMaterial({
        color: 0x00ff00
      });
      const line = new THREE.LineSegments(edges, material);
      scene.add(line);
      this.debugMeshes.push({ body, mesh: line });
    }
  }

  updateDebug() {
    if (!this.debugEnabled) return;
    for (const item of this.debugMeshes) {
      const { body, mesh } = item;
      body.collider.update();
      const center = new THREE.Vector3()
        .addVectors(body.collider.min, body.collider.max)
        .multiplyScalar(0.5);
      mesh.position.copy(center);
    }
  }

  step(delta) {
    for (const body of this.bodies) {
      body.rigidbody.grounded = false;
    }

    for (const body of this.bodies) {
      body.rigidbody.applyGravity(delta);
      this.moveAxis(body, "x", delta);
      this.moveAxis(body, "z", delta);
      this.moveAxis(body, "y", delta);
    }

    this.updateDebug();
  }

  // moveAxis(body, axis, delta) {
  //   body.position[axis] += body.rigidbody.velocity[axis] * delta;
  //   body.collider.update();

  //   for (const other of this.bodies) {
  //     if (body === other) continue;
  //     if (!body.collider.intersects(other.collider)) continue;

  //     // colisão detectada → empurra pra fora
  //     if (body.rigidbody.velocity[axis] > 0)
  //       body.position[axis] = other.collider.min[axis] - body.collider.size[axis] / 2;
  //     else if (body.rigidbody.velocity[axis] < 0)
  //       body.position[axis] = other.collider.max[axis] + body.collider.size[axis] / 2;

  //     body.rigidbody.velocity[axis] = 0;

  //     if (axis === "y" && body.rigidbody.velocity.y <= 0)
  //       body.rigidbody.grounded = true;

  //     body.collider.update();
  //   }
  // }

  moveAxis(body, axis, delta) {
    body.position[axis] += body.rigidbody.velocity[axis] * delta;
    body.collider.update();
    for (const other of this.bodies) {
      if (body === other) continue;
      if (!body.collider.intersects(other.collider)) continue;
      if (axis === "y") {
        if (body.rigidbody.velocity.y < 0) {
          // ESTAVA CAINDO → bateu no chão
          body.position.y = other.collider.max.y + body.collider.size.y / 2;
          body.rigidbody.grounded = true;
        }
        else if (body.rigidbody.velocity.y > 0) {
          // Bateu no teto
          body.position.y = other.collider.min.y - body.collider.size.y / 2;
        }
        body.rigidbody.velocity.y = 0;
      }
      body.collider.update();
    }
  }

  Clear() {
    this.bodies = [];
  }

}

export const World = new PhysicsWorld();