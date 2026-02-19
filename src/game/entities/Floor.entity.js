import * as THREE from 'three';
import Entity from '../../../engine/Entity';

export default class Floor extends Entity {

  name = 'floor';

  constructor() {
    super();

    this.geometry = new THREE.BoxGeometry(10, 0.2, 10);
    this.material = new THREE.MeshLambertMaterial({ color: 0xcccccc });

    this.body = window.game.physics.add(this, {
      shape: 'box',
      size: [10, 0.2, 10],
      move: false,
    });
  }

  update(dt) {
    // console.log("Floor update", dt);
  }


}