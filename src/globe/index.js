import { init as initScene } from "./scene";
import initSphere from "./planet";

export default function initGlobe(container) {
  initScene(container);
  initSphere();
}
