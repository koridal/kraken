"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function KrakenCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.03);

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0.4, 5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    container.appendChild(renderer.domElement);

    const resize = () => {
      const width = container.clientWidth || 400;
      const height = container.clientHeight || 260;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#22d3ee"),
      emissive: new THREE.Color("#22d3ee"),
      emissiveIntensity: 0.25,
      roughness: 0.35,
      metalness: 0.6,
      transparent: true,
      opacity: 0.9,
    });

    const group = new THREE.Group();
    scene.add(group);

    const bodyGeom = new THREE.SphereGeometry(1.1, 64, 64);
    const body = new THREE.Mesh(bodyGeom, material);
    body.position.y = 0.1;
    group.add(body);

    const tentacleGeom = new THREE.CylinderGeometry(
      0.06,
      0.22,
      2.2,
      32,
      32,
      true,
    );
    const tentacles = [];
    const tentacleCount = 6;

    for (let i = 0; i < tentacleCount; i += 1) {
      const t = new THREE.Mesh(tentacleGeom, material);
      const angle = (i / tentacleCount) * Math.PI * 2;
      t.position.set(Math.cos(angle) * 0.8, -0.8, Math.sin(angle) * 0.8);
      t.rotation.z = Math.PI / 2.4;
      t.castShadow = true;
      group.add(t);
      tentacles.push({ mesh: t, baseAngle: angle });
    }

    const eyeGeom = new THREE.SphereGeometry(0.35, 32, 32);
    const eyeMat = new THREE.MeshStandardMaterial({
      color: "#f97316",
      emissive: "#f97316",
      emissiveIntensity: 0.4,
      roughness: 0.2,
      metalness: 0.8,
    });
    const eye = new THREE.Mesh(eyeGeom, eyeMat);
    eye.position.set(0, 0.1, 1);
    group.add(eye);

    const pupilGeom = new THREE.SphereGeometry(0.17, 32, 32);
    const pupilMat = new THREE.MeshStandardMaterial({
      color: "#020617",
      roughness: 0.4,
    });
    const pupil = new THREE.Mesh(pupilGeom, pupilMat);
    pupil.position.set(0, 0.08, 1.18);
    group.add(pupil);

    const ambient = new THREE.AmbientLight(0x38bdf8, 0.9);
    scene.add(ambient);

    const mainLight = new THREE.PointLight(0x7c3aed, 22, 22);
    mainLight.position.set(4, 3, 4);
    scene.add(mainLight);

    const fillLight = new THREE.PointLight(0x22d3ee, 18, 18);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    let frameId;
    const start = performance.now();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = (performance.now() - start) / 1000;

      const wobble = Math.sin(t * 0.7) * 0.12;
      group.rotation.y = Math.sin(t * 0.3) * 0.3;
      group.position.y = Math.sin(t * 0.9) * 0.18;

      tentacles.forEach((tent) => {
        const phase = t * 1.4 + tent.baseAngle;
        tent.mesh.rotation.x = Math.sin(phase) * 0.6;
        tent.mesh.rotation.z = Math.cos(phase * 0.6) * 0.45 + wobble;
      });

      pupil.position.x = Math.sin(t * 0.5) * 0.12;
      pupil.position.y = 0.08 + Math.cos(t * 0.6) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      container.innerHTML = "";
      renderer.dispose();
      bodyGeom.dispose();
      tentacleGeom.dispose();
      eyeGeom.dispose();
      pupilGeom.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative h-[260px] w-full overflow-hidden rounded-3xl bg-gradient-to-b from-sky-500/20 via-slate-950 to-slate-950 shadow-[0_0_45px_rgba(56,189,248,0.45)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0_0,rgba(248,250,252,0.28),transparent_60%),radial-gradient(circle_at_100%_100%,rgba(129,140,248,0.32),transparent_60%)] mix-blend-screen opacity-60" />
    </div>
  );
}


