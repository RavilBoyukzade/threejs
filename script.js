import * as THREE from "https://esm.sh/three"

// Сцена, камера, рендер
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Солнце
const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Орбита Земли
const earthOrbit = new THREE.Object3D();
scene.add(earthOrbit);

// Земля
const earthGeometry = new THREE.SphereGeometry(0.3, 32, 32);
const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.x = 4;
earthOrbit.add(earth);

// Орбита Луны
const moonOrbit = new THREE.Object3D();
earth.add(moonOrbit);

// Луна
const moonGeometry = new THREE.SphereGeometry(0.1, 32, 32);
const moonMaterial = new THREE.MeshBasicMaterial({ color: 0x888888 });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.x = 0.6;
moonOrbit.add(moon);

// Анимация
function animate() {
  requestAnimationFrame(animate);

  earthOrbit.rotation.y += 0.01; // Земля вокруг Солнца
  moonOrbit.rotation.y += 0.05;  // Луна вокруг Земли
  sun.rotation.y += 0.002;       // Вращение Солнца

  renderer.render(scene, camera);
}

animate();

// Адаптация к размеру окна
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

