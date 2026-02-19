import * as THREE from 'three';
import { EditorCameraController } from "../EditorCameraController";
import { Camera } from "../Camera";
import { Render } from "../Renderer";
import { Scenes } from "../SceneManager";
import Stats from 'stats.js';
import { Output } from '../utils/Event';

class Editor {

  stats = new Stats();

  constructor() {
    this.SetMenus();
    this.editorCameraController = new EditorCameraController(Camera, Render.renderer.domElement);
    this.AddGrid();
    this.stats.showPanel(0);
    document.getElementById('stats').appendChild(this.stats.dom);

    Output('sceneChanged', this.OnChangeScene.bind(this));
  }

  AddGrid() {
    const grid = new THREE.GridHelper(200, 100, 0x000000, 0x000000);
    Scenes.currentScene.add(grid);
  }

  OnChangeScene() {
    this.AddGrid();
  }

  Update(dt) {
    this.editorCameraController.update(dt);
  }

  SetMenus() {
    const playButton = document.getElementById('playMenu');
    playButton.addEventListener('click', () => {
      window.open('game.html',);
    });
  }

}

export const EditorInstance = new Editor();