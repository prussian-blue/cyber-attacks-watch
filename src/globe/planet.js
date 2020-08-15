import * as THREE from "three";
import { PLANET_RADIUS, PLANET_QUALITY } from "./constants";
import { rootMesh } from "./scene";

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default function initSphere() {
  const geometry = new THREE.SphereGeometry(PLANET_RADIUS, PLANET_QUALITY, PLANET_QUALITY);
  const loader = new THREE.TextureLoader();
  const material = new THREE.MeshPhongMaterial({
    map: loader.load(`generatedTextures/image (${randomInt(1, 38)}).png`)
  });
  const mesh = new THREE.Mesh(geometry, material);

  rootMesh.add(mesh);
}
