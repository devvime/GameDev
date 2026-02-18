import * as THREE from 'three';
import Entity from '../../../engine/Entity';
import { Animator } from '../../../engine/Animator';
import { PlayerSkinController } from '../components/player/PlayerSkin.component';
import { CharacterController } from '../../../engine/physics/CharacterController';
import { CameraFollow } from '../components/player/CameraFollow.component';

export default class Player extends Entity {

  name = 'Player';

  constructor() {
    super();

    this.states = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      jump: false
    }

    this.position.set(0, 3, 0);

    this.SetCollider({
      size: new THREE.Vector3(0.4, 1.7, 0.4),
      offset: new THREE.Vector3(0, 0, 0)
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
    this.skinController = new PlayerSkinController(this);
    this.characterController = new CharacterController(this, window.game.camera);
    this.cameraFollow = new CameraFollow(window.game.camera, this, {
      offset: new THREE.Vector3(0, 1.8, 3),
      smooth: 0.1
    });
  }

  Update(dt) {
    this.Movement();
    if (!this.model) return;
    this.model.position.copy(this.position);
    this.model.position.y -= 0.85;

    if (this.skinController) this.skinController.update(dt);
    if (this.characterController) this.characterController.update(this.states, dt);
    if (this.cameraFollow) this.cameraFollow.update(dt);
  }

  Movement() {
    if (this.inputs.keys.w) {
      this.states.forward = true;
    }
    else {
      this.states.forward = false;
    }

    if (this.inputs.keys.s) {
      this.states.backward = true;
    }
    else {
      this.states.backward = false;
    }

    if (this.inputs.keys.a) {
      this.states.left = true;
    }
    else {
      this.states.left = false;
    }

    if (this.inputs.keys.d) {
      this.states.right = true;
    }
    else {
      this.states.right = false;
    }

    if (this.inputs.keys.spacebar) {
      this.states.jump = true;
    }
    else {
      this.states.jump = false;
    }
  }

  OnDestroy() {
    //
  }


}