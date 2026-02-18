import { Game } from "../engine/Game";
import { MainScene } from "./game/scenes/Main.scene";
import { GameScene } from "./game/scenes/Game.scene";

export function init() {
  window.game = new Game();
  window.game.scenes.AddScene("Main", MainScene);
  window.game.scenes.AddScene("Game", GameScene);
  window.game.scenes.SetScene("Main");
}