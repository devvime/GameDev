import * as THREE from 'three';
import Entity from '../../../engine/Entity';
import { Animator } from '../../../engine/Animator';
import { PlayerSkinController } from '../components/player/PlayerSkin.component';
import { CameraFollow } from '../components/player/CameraFollow.component';

export default class Player extends Entity {

  name = 'Player';

  constructor() {
    super();

    this.position.set(0, 3, 0);
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

  UpdateComponets() {
    if (this.skinController) this.skinController.update(dt);
    if (this.cameraFollow) this.cameraFollow.update(dt);
  }

  Update(dt) {
    if (!this.model) return;
    this.model.position.copy(this.position);
    this.model.position.y -= 0.85;

    this.UpdateComponets();
  }

  OnDestroy() {
    //
  }


}