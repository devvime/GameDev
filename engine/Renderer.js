import * as THREE from 'three';
import { Camera } from './Camera';
import { Scenes } from './SceneManager';

class Renderer {

  constructor() {
    this.clock = new THREE.Clock();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.renderer.setAnimationLoop(() => {
      if (window.editor) window.editor.stats.begin();

      const dt = this.clock.getDelta();
      window.game.physics.step();
      Scenes.Update(dt);
      this.renderer.render(Scenes.currentScene, Camera);

      if (window.editor) window.editor.Update(dt);
      if (window.editor) window.editor.stats.end();
    });

    window.addEventListener('resize', () => {
      Camera.aspect = window.innerWidth / window.innerHeight;
      Camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    document.body.appendChild(this.renderer.domElement);
  }
}

export const Render = new Renderer();