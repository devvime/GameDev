export class InputManager {

  constructor() {
    this.keys = {};
    this.mouse = { x: 0, y: 0, buttons: {} };

    window.addEventListener('keydown', (e) => {
      if (e.key === ' ') {
        this.keys['spacebar'] = true;
        return;
      }
      this.keys[e.key.toLocaleLowerCase()] = true;
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === ' ') {
        this.keys['spacebar'] = false;
        return;
      }
      this.keys[e.key.toLocaleLowerCase()] = false;
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mousedown', (e) => {
      this.mouse.buttons[e.button] = true;
    });

    window.addEventListener('mouseup', (e) => {
      this.mouse.buttons[e.button] = false;
    });

  }
}