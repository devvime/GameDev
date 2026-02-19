import * as THREE from "three";

export class EditorCameraController {

  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;

    /* CONFIG */
    this.moveSpeed = 10;
    this.fastSpeed = 40;
    this.zoomSpeed = 1.2;
    this.rotateSpeed = 0.003;
    this.panSpeed = 0.002;

    /* STATE */
    this.keys = {};
    this.isRotating = false;
    this.isPanning = false;

    this.pitch = -0.4;
    this.yaw = 0.8;

    this.pivot = new THREE.Vector3(0, 0, 0);
    this.distance = 10;

    this.velocity = new THREE.Vector3();

    this._initEvents();
    this._updateCameraTransform();
  }

  /* ---------------- EVENTS ---------------- */

  _initEvents() {

    window.addEventListener("keydown", e => this.keys[e.code] = true);
    window.addEventListener("keyup", e => this.keys[e.code] = false);

    this.domElement.addEventListener("contextmenu", e => e.preventDefault());

    this.domElement.addEventListener("mousedown", e => {
      if (e.button === 2) this.isRotating = true;   // RMB
      if (e.button === 1) this.isPanning = true;    // MMB
    });

    window.addEventListener("mouseup", () => {
      this.isRotating = false;
      this.isPanning = false;
    });

    window.addEventListener("mousemove", e => {

      if (this.isRotating) {
        this.yaw -= e.movementX * this.rotateSpeed;
        this.pitch -= e.movementY * this.rotateSpeed;

        const limit = Math.PI / 2 - 0.01;
        this.pitch = Math.max(-limit, Math.min(limit, this.pitch));
      }

      if (this.isPanning) {
        const panX = -e.movementX * this.panSpeed * this.distance;
        const panY = e.movementY * this.panSpeed * this.distance;

        const right = new THREE.Vector3().setFromMatrixColumn(this.camera.matrix, 0);
        const up = new THREE.Vector3().setFromMatrixColumn(this.camera.matrix, 1);

        this.pivot.addScaledVector(right, panX);
        this.pivot.addScaledVector(up, panY);
      }
    });

    this.domElement.addEventListener("wheel", e => {
      this.distance *= (e.deltaY > 0) ? this.zoomSpeed : 1 / this.zoomSpeed;
      this.distance = Math.max(0.2, this.distance);
    });
  }

  /* ---------------- UPDATE ---------------- */

  update(delta) {

    const speed = (this.keys["ShiftLeft"] ? this.fastSpeed : this.moveSpeed) * delta;

    const forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);
    forward.y = 0; forward.normalize();

    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
    const up = new THREE.Vector3(0, 1, 0);

    if (this.keys["KeyW"]) this.pivot.addScaledVector(forward, speed);
    if (this.keys["KeyS"]) this.pivot.addScaledVector(forward, -speed);
    if (this.keys["KeyA"]) this.pivot.addScaledVector(right, -speed);
    if (this.keys["KeyD"]) this.pivot.addScaledVector(right, speed);
    if (this.keys["KeyQ"]) this.pivot.addScaledVector(up, -speed);
    if (this.keys["KeyE"]) this.pivot.addScaledVector(up, speed);

    this._updateCameraTransform();
  }

  /* ---------------- CAMERA ---------------- */

  _updateCameraTransform() {

    const rot = new THREE.Euler(this.pitch, this.yaw, 0, "YXZ");

    const offset = new THREE.Vector3(0, 0, this.distance).applyEuler(rot);

    this.camera.position.copy(this.pivot).add(offset);
    this.camera.lookAt(this.pivot);
  }

  /* Focus em objeto */
  focus(object3D) {
    const box = new THREE.Box3().setFromObject(object3D);
    box.getCenter(this.pivot);
    this.distance = box.getSize(new THREE.Vector3()).length() * 0.6;
    this._updateCameraTransform();
  }
}