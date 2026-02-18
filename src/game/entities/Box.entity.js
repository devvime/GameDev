import * as THREE from 'three';
import Entity from '../../../engine/Entity';

export default class Box extends Entity {

  name = 'box';

  constructor() {
    super();

    this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });

    this.position.set(-2, 3, 0);

    this.SetCollider({
      size: new THREE.Vector3(1, 1, 1),
      offset: new THREE.Vector3(0, 0, 0)
    });
  }

  Update(dt) {
    // console.log("Box update", dt);
  }

  OnDestroy() {
    //
  }


}