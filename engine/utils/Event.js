export function Emit(name, data) {
  const event = new CustomEvent(name, { detail: data });
  document.dispatchEvent(event);
}

export function Output(name, callback) {
  document.addEventListener(name, callback);
}