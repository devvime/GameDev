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
    this.raycaster = new THREE.Raycaster();
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
        item.mesh.onGround = this.checkGround(item.mesh);
      }
    }
  }

  // checkGround(body) {
  //   var contact = this.world.contacts;
  //   while (contact !== null) {
  //     if ((contact.body1 === body || contact.body2 === body) && contact.touching) {
  //       return true;
  //     }
  //     contact = contact.next;
  //   }
  //   return false;
  // }

  checkGround(entity) {
    const halfHeight = entity.height / 2;
    const radius = entity.width / 1.5;
    const down = new THREE.Vector3(0, -1, 0);

    const offsets = [
      new THREE.Vector3(0, 0, 0), // centro
      new THREE.Vector3(radius, 0, radius),   // frente direita
      new THREE.Vector3(-radius, 0, radius),  // frente esquerda
      new THREE.Vector3(radius, 0, -radius),  // trás direita
      new THREE.Vector3(-radius, 0, -radius), // trás esquerda
    ];

    for (let offset of offsets) {
      const origin = entity.position.clone();
      origin.y -= halfHeight;
      origin.add(offset);

      this.raycaster.set(origin, down);
      this.raycaster.far = 0.25;

      const intersects = this.raycaster.intersectObjects(
        window.game.scenes.currentScene.children,
        true
      );

      if (intersects.length > 0) {
        return true;
      }
    }

    return false;
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