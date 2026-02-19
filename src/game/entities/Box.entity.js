import * as THREE from 'three';
import Entity from '../../../engine/Entity';

export default class Box extends Entity {

  name = 'box';

  constructor() {
    super();

    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

    this.body = window.game.physics.add(this, {
      shape: 'box',
      size: [1, 1, 1],
      pos: [-2, 3, 0]
    });
  }

  Update(dt) {
    // console.log("Box update", dt);
  }

  OnDestroy() {
    //
  }


}