import Scene from './Scene';
import { Emit } from './utils/Event';
import { disposeObject } from './utils/Dispose';

class SceneManager {

  constructor() {
    this.scenes = {};
    this.currentScene = new Scene();
  }

  AddScene(name, scene) {
    this.scenes[name] = scene;
  }

  async SetScene(name) {
    window.game.loading.Show();
    this.Destroy();
    if (this.scenes[name]) {
      this.currentScene = new this.scenes[name]();
      if (this.currentScene.OnLoad) await this.currentScene.OnLoad();

      for (const obj of Object.keys(this.currentScene.objects)) {
        const entity = this.currentScene.objects[obj];
        this.currentScene.add(entity);
        if (entity.Create) await entity.Create();
      }

      Emit("sceneChanged", name);
    } else {
      console.warn(`Scene ${name} does not exist.`);
    }
  }

  Update(dt) {
    if (window.editor) return;
    if (this.currentScene && this.currentScene.Update) {
      for (const obj of Object.keys(this.currentScene.objects)) {
        const entity = this.currentScene.objects[obj];
        if (entity.Update) entity.Update(dt);
      }
      this.currentScene.Update(dt);
    }
  }

  Destroy() {
    const scene = this.currentScene;
    if (!scene) return;

    for (const obj of Object.keys(scene.objects)) {
      const entity = scene.objects[obj];
      if (entity.Destroy) entity.Destroy();
    }

    while (scene.children.length > 0) {
      const obj = scene.children[0];
      disposeObject(obj);
      scene.remove(obj);
    }

    if (scene.OnDestroy) scene.OnDestroy();

    scene.objects = {};

    if (window.renderer) {
      renderer.renderLists.dispose();
    }
  }

}

export const Scenes = new SceneManager();