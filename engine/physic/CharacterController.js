export class CharacterController {
  constructor(character, world) {
    this.character = character;
    this.body = character.body;
    this.world = world;
    this.moveSpeed = 1.8;
    this.jumpForce = 4.5;

    this.keys = { forward: false, backward: false, left: false, right: false, space: false };
    this.initInput();
  }

  initInput() {
    window.addEventListener('keydown', (e) => this.handleKey(e.code, true));
    window.addEventListener('keyup', (e) => this.handleKey(e.code, false));
  }

  handleKey(code, isPressed) {
    if (code === 'KeyW') this.keys.forward = isPressed;
    if (code === 'KeyS') this.keys.backward = isPressed;
    if (code === 'KeyA') this.keys.left = isPressed;
    if (code === 'KeyD') this.keys.right = isPressed;
    if (code === 'Space') this.keys.space = isPressed;
  }

  update(dt) {
    let vx = 0;
    let vz = 0;
    const vy = this.body.linearVelocity.y; // Mantém a gravidade atual

    // Cálculo de direção
    if (this.keys.forward) vz -= this.moveSpeed;
    if (this.keys.backward) vz += this.moveSpeed;
    if (this.keys.left) vx -= this.moveSpeed;
    if (this.keys.right) vx += this.moveSpeed;

    // Aplica o movimento mantendo a física de queda
    this.body.linearVelocity.set(vx, vy, vz);

    // Pulo
    if (this.keys.space && this.character.onGround) {
      this.body.linearVelocity.y = this.jumpForce;
    }
  }
}