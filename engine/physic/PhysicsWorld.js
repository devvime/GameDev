import './oimo.min.js';
import * as THREE from 'three';

class PhysicsWorld {
  constructor() {
    this.world = new OIMO.World({
      timestep: 1 / 60,
      iterations: 8,
      broadphase: 2,
      worldscale: 1,
      random: true,
      info: false,
      gravity: [0, -9.8, 0],
    });
    this.debugMeshes = [];
    this.bodies = [];
  }

  add(mesh, {
    shape = 'box',
    size = [1, 1, 1],
    pos = [0, 0, 0],
    rot = [0, 0, 0],
    move = true,
    density = 1,
    friction = 0.2,
    restitution = 0.2,
    belongsTo = 1,
    collidesWith = 0xffffffff,
  }) {
    const body = this.world.add({
      type: shape,
      size: size,
      pos: pos,
      rot: rot,
      move: move,
      density: density,
      friction: friction,
      restitution: restitution,
      belongsTo: belongsTo,
      collidesWith: collidesWith
    });
    const debugMesh = this.createDebugMesh(size);
    this.debugMeshes.push({ body, mesh: debugMesh });
    this.bodies.push({ body, mesh });
    return body;
  }

  createDebugMesh(size) {
    const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color: 0x00ff00
    });
    const line = new THREE.LineSegments(edges, material);
    window.game.scenes.currentScene.add(line);
    return line;
  }

  step() {
    this.world.step();

    // if (debug) {
    for (const item of this.debugMeshes) {
      item.mesh.position.copy(item.body.getPosition());
      item.mesh.quaternion.copy(item.body.getQuaternion());
    }
    // }

    for (const item of this.bodies) {
      item.mesh.position.copy(item.body.getPosition());
      item.mesh.quaternion.copy(item.body.getQuaternion());
    }
  }
}

export const Physics = new PhysicsWorld();