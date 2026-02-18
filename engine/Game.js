import { Camera } from './Camera';
import { InputManager } from './InputManager';
import { Render } from './Renderer';
import { Scenes } from './SceneManager';
import SkyBox from './Skybox';
import { LoadModel } from './Loader';
import { World } from './physics/PhysicsWorld';
import { Loading } from './utils/Loading';
import { Output } from './utils/Event';

export class Game {

  constructor() {
    this.loading = Loading;
    this.loading.Show();
    this.camera = Camera;
    this.loadModel = LoadModel;
    this.world = World;
    this.renderer = Render;
    this.inputs = new InputManager();
    this.scenes = Scenes;
    this.skybox = new SkyBox();

    Output('sceneChanged', () => this.loading.Hide());
  }

}