import * as THREE from "three";

const canvas = document.querySelector("#scene");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canvas) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (error) {
    console.warn("WebGL is not available; the rest of the portfolio still works.", error);
  }

  if (renderer) {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 12);

    const group = new THREE.Group();
    scene.add(group);

    const geometry = new THREE.TorusKnotGeometry(2.05, 0.48, 180, 24, 2, 3);
    const material = new THREE.MeshStandardMaterial({
      color: 0x9f101b, metalness: 0.78, roughness: 0.25,
      emissive: 0x330008, emissiveIntensity: 0.8
    });
    const knot = new THREE.Mesh(geometry, material);
    knot.rotation.set(0.4, 0.2, -0.25);
    group.add(knot);

    const wire = new THREE.Mesh(
      new THREE.TorusKnotGeometry(2.18, 0.018, 180, 8, 2, 3),
      new THREE.MeshBasicMaterial({ color: 0xff5964, transparent: true, opacity: 0.7 })
    );
    wire.rotation.copy(knot.rotation);
    group.add(wire);

    const ambient = new THREE.AmbientLight(0x7c2834, 1.6);
    scene.add(ambient);
    const keyLight = new THREE.PointLight(0xff3344, 75, 30);
    keyLight.position.set(3, 3, 6);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x6633ff, 45, 30);
    rimLight.position.set(-5, -2, -2);
    scene.add(rimLight);

    const particleCount = 650;
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
      sizes[i] = Math.random();
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({ color: 0xffc2c6, size: 0.025, transparent: true, opacity: 0.75 })
    );
    scene.add(particles);

    let pointerX = 0, pointerY = 0, targetX = 0, targetY = 0;
    window.addEventListener("pointermove", (event) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 0.7;
      targetY = (event.clientY / window.innerHeight - 0.5) * 0.35;
    }, { passive: true });

    function resize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", resize, { passive: true });

    const clock = new THREE.Clock();
    renderer.setAnimationLoop(() => {
      const t = clock.getElapsedTime();
      if (!reducedMotion) {
        pointerX += (targetX - pointerX) * 0.025;
        pointerY += (targetY - pointerY) * 0.025;
        group.rotation.y = t * 0.09 + pointerX;
        group.rotation.x = Math.sin(t * 0.16) * 0.12 + pointerY;
        knot.rotation.z = -0.25 + Math.sin(t * 0.18) * 0.1;
        particles.rotation.y = t * 0.008;
      }
      const mobile = window.innerWidth < 700;
      group.position.set(mobile ? 2.4 : 3.7, mobile ? -1.3 : 0.1, 0);
      group.scale.setScalar(mobile ? 0.78 : 1);
      renderer.render(scene, camera);
    });
  }
}
