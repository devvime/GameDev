import './oimo.min.js';
import * as THREE from 'three';

class PhysicsWorld {
  constructor() {
    this.debug = false;
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
    name = "Body",
    offsetY = 0
  }) {
    this.offsetY = offsetY;
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
      collidesWith: collidesWith,
      name: name
    });
    this.bodies.push({ body, mesh });

    const debugMesh = this.createDebugMesh(size);
    this.debugMeshes.push({ body, mesh: debugMesh });

    return body;
  }

  createDebugMesh(size) {
    const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
    const edges = new THREE.EdgesGeometry(geometry);
    const material = new THREE.LineBasicMaterial({
      color: 0x00ff00
    });
    const line = new THREE.LineSegments(edges, material);
    return line;
  }

  enableDebug() {
    this.debug = true;
    for (const item of this.debugMeshes) {
      window.game.scenes.currentScene.add(item.mesh);
    }
  }

  step() {
    this.world.step();

    if (this.debug) {
      for (const item of this.debugMeshes) {
        item.mesh.position.copy(item.body.getPosition());
        item.mesh.quaternion.copy(item.body.getQuaternion());
      }
    }

    for (const item of this.bodies) {
      item.mesh.position.copy(item.body.getPosition());
      item.mesh.quaternion.copy(item.body.getQuaternion());

      if (item.body.name === 'PlayerBody') {
        item.body.orientation.set(0, item.body.orientation.y, 0, item.body.orientation.w);
        item.body.angularVelocity.set(0, item.body.angularVelocity.y, 0);
        if (item.mesh.model) {
          item.mesh.model.position.copy(item.mesh.position);
          item.mesh.model.position.y -= this.offsetY;
        }
      }
    }
  }

  clear() {
    for (const item of this.bodies) {
      this.world.remove(item.body);
    }
    this.bodies = [];

    for (const item of this.debugMeshes) {
      window.game.scenes.currentScene.remove(item.mesh);
    }
    this.debugMeshes = [];
  }
}

export const Physics = new PhysicsWorld();