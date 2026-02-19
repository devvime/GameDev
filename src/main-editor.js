import { init } from ".";
import { EditorInstance } from "../engine//editor/Editor";

init();
window.game.physics.enableDebug();
window.editor = EditorInstance;