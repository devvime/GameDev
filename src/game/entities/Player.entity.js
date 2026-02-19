import * as THREE from 'three';
import Entity from '../../../engine/Entity';
import { Animator } from '../../../engine/Animator';
import { PlayerSkinController } from '../components/player/PlayerSkin.component';
import { CameraFollow } from '../components/player/CameraFollow.component';

export default class Player extends Entity {

  name = 'Player';

  constructor() {
    super();

    this.body = window.game.physics.add(this, {
      name: 'PlayerBody',
      offsetY: 0.85,
      shape: 'box',
      size: [0.3, 1.7, 0.3],
      pos: [0, 3, 0],
      restitution: 0,
    });
  }

  async Create() {
    const { model, animations } = await window.game.loadModel('src/assets/models/player.glb');
    this.model = model;
    this.animations = animations;
    this.animator = new Animator(this.model, animations);
    this.SetComponents();
    window.game.scenes.currentScene.add(this.model);
  }

  SetComponents() {
    // this.skinController = new PlayerSkinController(this);
    // this.cameraFollow = new CameraFollow(window.game.camera, this, {
    //   offset: new THREE.Vector3(0, 1.8, 3),
    //   smooth: 0.1
    // });
  }

  UpdateComponets(dt) {
    if (this.skinController) this.skinController.update(dt);
    if (this.cameraFollow) this.cameraFollow.update(dt);
  }

  Update(dt) {
    if (!this.model) return;
    this.UpdateComponets(dt);
  }


}