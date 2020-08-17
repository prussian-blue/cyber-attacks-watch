import * as THREE from "three";
import { PLANET_RADIUS, PLANET_QUALITY } from "./constants";
import { rootMesh } from "./scene";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

export default function initSphere() {
  const r = randomInt(1, 28);
  // const r = 34;

  const geometry = new THREE.SphereGeometry(
    PLANET_RADIUS * randomFloat(0.5, 1),
    PLANET_QUALITY,
    PLANET_QUALITY
  );
  const loader = new THREE.TextureLoader();
  const material = new THREE.MeshPhongMaterial({
    map: loader.load(`generatedTextures/image (${r}).png`)
    // map: loader.load(`generatedTextures/image (${5}).png`)
    // map: loader.load(`textureGenerator/textures/t4.jpg`)
  });
  const mesh = new THREE.Mesh(geometry, material);

  document.querySelector(".planet-name").innerHTML = `Alpha Centauri ${r}`;

  rootMesh.add(mesh);
}
