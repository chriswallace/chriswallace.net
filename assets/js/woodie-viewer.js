// A real 3D Woodie on a canvas, shaded and lit the way the Woodies website's ModelDisplay shows one:
// toon materials with four flat lighting bands, a warm key light with a soft sky and ground fill, a painted
// ground shadow, and a camera fitted to the model. One rim light is added here, because this Woodie stands
// in front of a dark forest. index.html loads this file only when the reader nears the Woodies chapter, and
// runs it only while the Woodie is on screen.
import * as THREE from "three";
import { GLTFLoader } from "./three/loaders/GLTFLoader.js";

export function mount(canvas, urls) {
  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.NoToneMapping;       // the cel bands keep the colours the model was painted in
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.rotation.set(-0.18, 0, 0);
  camera.position.set(0, 1.7, 3);

  // Toon lighting: one warm key from the front left and a soft sky and ground fill.
  scene.add(new THREE.HemisphereLight(0xfff4e0, 0x9db98a, 0.85));
  const key = new THREE.DirectionalLight(0xffffff, 2.1);
  key.position.set(-2.5, 5, 4);
  scene.add(key);
  // A cool rim from behind on the right, the colour of the forest's glow, so the outline reads against the dark.
  const rim = new THREE.DirectionalLight(0xa8f0d0, 1.5);
  rim.position.set(3.5, 2.5, -4);
  scene.add(rim);

  // The cel ramp: four flat lighting bands, sampled with nearest filtering so the steps stay crisp.
  const ramp = new THREE.DataTexture(new Uint8Array([96, 152, 212, 255]), 4, 1, THREE.RedFormat);
  ramp.minFilter = THREE.NearestFilter;
  ramp.magFilter = THREE.NearestFilter;
  ramp.needsUpdate = true;

  // Swap a glTF material for a toon material, carrying over the maps and settings that make the Woodie's look.
  function toToon(source) {
    const toon = new THREE.MeshToonMaterial({ gradientMap: ramp });
    if (source.color) toon.color.copy(source.color);
    toon.map = source.map || null;
    if (source.emissive) toon.emissive.copy(source.emissive);
    toon.emissiveMap = source.emissiveMap || null;
    toon.normalMap = source.normalMap || null;
    toon.vertexColors = Boolean(source.vertexColors);
    toon.transparent = Boolean(source.transparent);
    toon.opacity = source.opacity === undefined ? 1 : source.opacity;
    toon.alphaTest = source.alphaTest || 0;
    toon.side = source.side === undefined ? THREE.FrontSide : source.side;
    toon.name = source.name;
    source.dispose();
    return toon;
  }

  // The ground shadow is a painted disc with a hard edge, to match the toon shading.
  const disc = document.createElement("canvas");
  disc.width = disc.height = 256;
  const pen = disc.getContext("2d");
  pen.fillStyle = "rgba(0, 0, 0, 0.42)";
  pen.beginPath();
  pen.arc(128, 128, 127, 0, Math.PI * 2);
  pen.fill();
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(disc), transparent: true, depthWrite: false, toneMapped: false }));
  ground.rotation.x = -Math.PI / 2;
  ground.visible = false;
  scene.add(ground);

  const clock = new THREE.Clock();
  const loader = new GLTFLoader();
  let model = null, mixer = null, raf = 0, turn = 0, drag = 0, w = 0, h = 0;

  function load(url) { return new Promise(function (resolve, reject) { loader.load(url, resolve, undefined, reject); }); }

  // Fit the camera to this Woodie, with the same tilt, and room for it to turn.
  function fit() {
    if (!model) return;
    // measure the Woodie as posed by the idle animation, not in its arms-out bind pose
    model.updateMatrixWorld(true);
    model.traverse(function (child) { if (child.isSkinnedMesh) { child.skeleton.update(); child.computeBoundingBox(); } });
    const box = new THREE.Box3().setFromObject(model);
    if (!Number.isFinite(box.min.y) || !Number.isFinite(box.max.y)) return;
    // the shadow under the feet counts as part of the figure, so the whole of it sits in the middle of the frame
    const top = box.max.y, bottom = box.min.y - (box.max.y - box.min.y) * 0.04;
    const height = Math.max(top - bottom, 0.5), centerY = (top + bottom) / 2;
    const radius = Math.max(Math.abs(box.min.x), Math.abs(box.max.x), Math.abs(box.min.z), Math.abs(box.max.z));
    const vFov = camera.fov * Math.PI / 180, hFov = 2 * Math.atan(Math.tan(vFov / 2) * camera.aspect);
    const distance = Math.max(height * 1.36 / 2 / Math.tan(vFov / 2), radius * 2 * 1.18 / 2 / Math.tan(hFov / 2), 1.2);
    const forward = new THREE.Vector3(0, 0, -1).applyEuler(camera.rotation);
    const aimY = centerY + height * 0.05;      // aim a little high, so the spare room is above the head
    camera.position.set(-forward.x * distance, aimY - forward.y * distance, -forward.z * distance);
    // the shadow sits under the feet, sized from the model's height
    const tall = Math.max(box.max.y - box.min.y, 0.5);
    ground.scale.set(tall * 0.44, tall * 0.21, 1);
    ground.position.set(model.position.x, box.min.y - tall * 0.03, model.position.z + tall * 0.012);
    ground.visible = true;
  }
  function size() {
    const cw = canvas.clientWidth, ch = canvas.clientHeight;
    if (!cw || !ch || (cw === w && ch === h)) return;
    w = cw; h = ch;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    fit();
  }
  function render() {
    size();
    if (mixer) mixer.update(Math.min(clock.getDelta(), 0.1));
    if (model) model.rotation.y = turn + drag;
    renderer.render(scene, camera);
  }
  function frame() { raf = requestAnimationFrame(frame); render(); }

  const ready = Promise.all([load(urls.model), load(urls.idle)]).then(function (got) {
    model = got[0].scene;
    model.traverse(function (child) {
      if (!child.isMesh || !child.material) return;
      child.material = Array.isArray(child.material) ? child.material.map(toToon) : toToon(child.material);
    });
    scene.add(model);
    mixer = new THREE.AnimationMixer(model);
    const clip = got[1].animations && got[1].animations[0];
    if (clip) mixer.clipAction(clip).play();
    mixer.update(0);              // posed before it is first shown, never in its bind pose
    model.updateMatrixWorld(true);
    w = h = 0;                    // fit the camera on the next frame
  });

  return {
    ready: ready,
    start: function () { if (!raf) { clock.getDelta(); raf = requestAnimationFrame(frame); } },   // the idle animation runs
    stop: function () { if (raf) cancelAnimationFrame(raf); raf = 0; },
    once: function () { if (!raf) render(); },                                                     // one still picture
    turn: function (angle) { turn = angle; },                                                      // set by the scroll
    drag: function (angle) { drag += angle; }                                                      // added by the reader
  };
}
