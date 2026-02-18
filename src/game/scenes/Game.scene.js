import Scene from "../../../engine/Scene";
import Floor from "../entities/Floor.entity";

export class GameScene extends Scene {
  constructor() {
    super();
  }

  async OnLoad() {
    this.objects['floor'] = new Floor();
  }

  Update(dt) {
    if (game.inputs.keys.t) {
      game.scenes.SetScene("Main");
    }
  }
}