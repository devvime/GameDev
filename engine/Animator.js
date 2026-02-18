import * as THREE from 'three';

export class Animator {

  constructor(model, anims) {
    this.model = model;
    this.anims = anims;
    this.mixer = new THREE.AnimationMixer(this.model);
    this.animations = anims;
    this.currentAnim = ''
  }

  play(anim) {
    if (!this.mixer) return;
    if (this.currentAnim === anim) return;

    const clip = THREE.AnimationClip.findByName(this.animations, anim);
    if (!clip) return;

    const newAction = this.mixer.clipAction(clip);

    if (this.currentAction) {
      this.currentAction.fadeOut(0.3);
    }

    newAction
      .reset()
      .fadeIn(0.3)
      .play();

    this.currentAction = newAction;
    this.currentAnim = anim;
  }

  update(dt) {
    if (!this.mixer) return;
    this.mixer.update(dt);
  }

}