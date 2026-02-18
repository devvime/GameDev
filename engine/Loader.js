import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export async function LoadModel(path) {
  const gltf = await loader.loadAsync(path);

  const model = gltf.scene;
  const animations = gltf.animations;

  model.traverse(object => {
    if (object.isMesh) object.castShadow = true;
  });

  return { model, animations };
}