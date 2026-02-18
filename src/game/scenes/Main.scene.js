import Scene from "../../../engine/Scene";
import Floor from "../entities/Floor.entity";
import Box from "../entities/Box.entity";
import Player from "../entities/Player.entity";

export class MainScene extends Scene {
  constructor() {
    super();
  }

  async OnLoad() {
    this.objects['floor'] = new Floor();
    this.objects['box'] = new Box();
    this.objects['player'] = new Player();
  }

  Update(dt) {
    if (game.inputs.keys.r) {
      game.scenes.SetScene("Game");
    }
  }
}