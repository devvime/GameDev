export function disposeMaterial(material) {
  for (const key in material) {
    const value = material[key];
    if (value && value.isTexture) {
      value.dispose();
    }
  }
  material.dispose();
}

export function disposeObject(object) {
  object.traverse((child) => {
    if (child.geometry) {
      child.geometry.dispose();
    }
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach(mat => disposeMaterial(mat));
      } else {
        disposeMaterial(child.material);
      }
    }
    if (child.shadow && child.shadow.map) {
      child.shadow.map.dispose();
    }
  });
}
