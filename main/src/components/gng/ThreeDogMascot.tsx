"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type PartName =
  | "body"
  | "head"
  | "nose"
  | "left-ear"
  | "right-ear"
  | "glasses"
  | "front-legs"
  | "back-legs"
  | "tail";

export type MascotControlPart =
  | "head"
  | "nose"
  | "ears"
  | "glasses"
  | "front-legs"
  | "back-legs"
  | "tail";

export type MascotMotionRequest = {
  id: number;
  part: MascotControlPart;
};

type MascotPart = {
  activeUntil: number;
  basePosition: THREE.Vector3;
  baseQuaternion: THREE.Quaternion;
  group: THREE.Group;
  hoverOffset: {
    position: THREE.Vector3;
    rotation: THREE.Euler;
    scale: number;
  };
  name: PartName;
  nextMoveAt: number;
};

type ThreeDogMascotProps = {
  className?: string;
  motionRequest?: MascotMotionRequest | null;
};

const partMotion: Record<PartName, { move: number; rotate: number; scale: number }> = {
  body: { move: 0.035, rotate: 0.045, scale: 0.01 },
  head: { move: 0.07, rotate: 0.13, scale: 0.012 },
  nose: { move: 0.08, rotate: 0.08, scale: 0.018 },
  "left-ear": { move: 0.045, rotate: 0.18, scale: 0.01 },
  "right-ear": { move: 0.045, rotate: 0.18, scale: 0.01 },
  glasses: { move: 0.045, rotate: 0.11, scale: 0.012 },
  "front-legs": { move: 0.055, rotate: 0.11, scale: 0.01 },
  "back-legs": { move: 0.045, rotate: 0.08, scale: 0.01 },
  tail: { move: 0.055, rotate: 0.24, scale: 0.015 },
};

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function setPartOnObject(object: THREE.Object3D, part: PartName) {
  object.userData.part = part;
}

function createBalloonMaterial(color: number) {
  return new THREE.MeshPhysicalMaterial({
    clearcoat: 0.85,
    clearcoatRoughness: 0.26,
    color,
    roughness: 0.9,
    metalness: 0.02,
    sheen: 0.35,
    sheenColor: new THREE.Color(0xffd7ee),
  });
}

function ellipsoid(
  geometry: THREE.SphereGeometry,
  material: THREE.Material,
  part: PartName,
  position: THREE.Vector3Tuple,
  scale: THREE.Vector3Tuple,
  rotation: THREE.Vector3Tuple = [0, 0, 0],
) {
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.scale.set(...scale);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  setPartOnObject(mesh, part);
  return mesh;
}

function cylinderBetween(
  material: THREE.Material,
  part: PartName,
  radius: number,
  depth: number,
  position: THREE.Vector3Tuple,
  rotation: THREE.Vector3Tuple,
) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, 28), material);
  mesh.position.set(...position);
  mesh.rotation.set(...rotation);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  setPartOnObject(mesh, part);
  return mesh;
}

function makePart(
  root: THREE.Group,
  parts: MascotPart[],
  name: PartName,
  position: THREE.Vector3Tuple,
  rotation: THREE.Vector3Tuple = [0, 0, 0],
) {
  const group = new THREE.Group();
  group.position.set(...position);
  group.rotation.set(...rotation);
  root.add(group);
  parts.push({
    activeUntil: 0,
    basePosition: group.position.clone(),
    baseQuaternion: group.quaternion.clone(),
    group,
    hoverOffset: {
      position: new THREE.Vector3(),
      rotation: new THREE.Euler(),
      scale: 1,
    },
    name,
    nextMoveAt: 0,
  });
  return group;
}

function resolveControlPart(part: MascotControlPart): PartName[] {
  if (part === "ears") return ["left-ear", "right-ear"];
  return [part];
}

function randomizePart(part: MascotPart, elapsed: number, intensity = 1) {
  const motion = partMotion[part.name];
  const move = motion.move * intensity;
  const rotate = motion.rotate * intensity;
  const scale = motion.scale * intensity;

  part.hoverOffset.position.set(
    randomBetween(-move, move),
    randomBetween(-move, move),
    randomBetween(-move * 0.45, move * 0.45),
  );
  part.hoverOffset.rotation.set(
    randomBetween(-rotate, rotate),
    randomBetween(-rotate, rotate),
    randomBetween(-rotate, rotate),
  );
  part.hoverOffset.scale = randomBetween(1, 1 + scale);
  part.nextMoveAt = elapsed + randomBetween(0.42, 0.82);
}

function buildDogScene(scene: THREE.Scene) {
  const pink = createBalloonMaterial(0xf3a0ce);
  const pinkDeep = createBalloonMaterial(0xde5e98);
  const purple = new THREE.MeshPhysicalMaterial({
    clearcoat: 0.75,
    clearcoatRoughness: 0.22,
    color: 0x5c32ad,
    roughness: 0.28,
    metalness: 0.08,
  });
  const lens = new THREE.MeshPhysicalMaterial({
    color: 0xf6eaff,
    opacity: 0.28,
    roughness: 0.08,
    transparent: true,
  });
  const sphere = new THREE.SphereGeometry(1, 48, 32);
  const parts: MascotPart[] = [];
  const hitMeshes: THREE.Object3D[] = [];
  const root = new THREE.Group();
  root.rotation.set(0.04, -0.42, -0.02);
  root.position.set(0, -0.34, 0);
  root.scale.setScalar(0.92);
  scene.add(root);

  const body = makePart(root, parts, "body", [0.25, -0.52, 0]);
  body.add(ellipsoid(sphere, pink, "body", [0, 0, 0], [1.05, 0.55, 0.58], [0, 0, -0.06]));
  body.add(ellipsoid(sphere, pinkDeep, "body", [0.68, -0.08, -0.04], [0.56, 0.42, 0.44], [0, 0, 0.14]));

  const neck = makePart(root, parts, "head", [-0.34, 0.18, 0.02], [0, 0, -0.08]);
  neck.add(ellipsoid(sphere, pink, "head", [0, 0, 0], [0.42, 1.08, 0.42]));

  const head = makePart(root, parts, "head", [-0.56, 1.15, 0.03], [0, 0, 0.03]);
  head.add(ellipsoid(sphere, pink, "head", [0.02, 0.16, 0], [0.56, 0.58, 0.52]));
  head.add(ellipsoid(sphere, pink, "head", [-0.48, 0.04, 0.03], [0.58, 0.38, 0.42], [0, 0, -0.2]));
  head.add(ellipsoid(sphere, pink, "head", [-0.18, -0.16, 0.04], [0.48, 0.38, 0.44], [0, 0, 0.1]));

  const nose = makePart(root, parts, "nose", [-1.18, 1.2, 0.2], [0, 0, -0.08]);
  nose.add(ellipsoid(sphere, pinkDeep, "nose", [0, 0, 0], [0.12, 0.08, 0.1]));
  nose.add(ellipsoid(sphere, pinkDeep, "nose", [0.11, -0.01, 0], [0.08, 0.055, 0.075]));

  const leftEar = makePart(root, parts, "left-ear", [-0.62, 2.05, 0.02], [0.04, 0, -0.15]);
  leftEar.add(ellipsoid(sphere, pink, "left-ear", [0, 0, 0], [0.38, 0.86, 0.37], [0, 0, -0.04]));

  const rightEar = makePart(root, parts, "right-ear", [0.2, 2.1, 0.02], [0.02, 0, 0.18]);
  rightEar.add(ellipsoid(sphere, pink, "right-ear", [0, 0, 0], [0.42, 0.92, 0.39], [0, 0, 0.06]));
  rightEar.add(ellipsoid(sphere, pinkDeep, "right-ear", [0.04, 0.78, 0.03], [0.14, 0.14, 0.14]));

  const frontLegs = makePart(root, parts, "front-legs", [-0.36, -1.06, 0.02]);
  frontLegs.add(ellipsoid(sphere, pink, "front-legs", [-0.28, 0.1, 0.02], [0.42, 0.72, 0.42], [0, 0, -0.44]));
  frontLegs.add(ellipsoid(sphere, pink, "front-legs", [0.18, -0.1, 0.03], [0.43, 0.72, 0.42], [0, 0, 0.44]));

  const backLegs = makePart(root, parts, "back-legs", [0.82, -1.02, 0.02]);
  backLegs.add(ellipsoid(sphere, pink, "back-legs", [-0.18, 0.12, 0.02], [0.44, 0.68, 0.44], [0, 0, -0.38]));
  backLegs.add(ellipsoid(sphere, pinkDeep, "back-legs", [0.32, 0.04, -0.05], [0.48, 0.56, 0.45], [0, 0, 0.32]));

  const tail = makePart(root, parts, "tail", [1.18, -0.25, -0.06], [0.15, 0.03, -0.86]);
  tail.add(cylinderBetween(pinkDeep, "tail", 0.08, 0.86, [0, 0.38, 0], [0, 0, 0]));
  tail.add(ellipsoid(sphere, pinkDeep, "tail", [0, 0.86, 0], [0.16, 0.16, 0.16]));

  const glasses = makePart(root, parts, "glasses", [-0.56, 1.28, 0.53], [0.02, 0.12, -0.03]);
  const ringGeometry = new THREE.TorusGeometry(0.25, 0.045, 16, 56);
  const leftRing = new THREE.Mesh(ringGeometry, purple);
  leftRing.position.set(-0.27, 0.04, 0);
  const rightRing = new THREE.Mesh(ringGeometry, purple);
  rightRing.position.set(0.26, 0.04, 0);
  const leftLens = new THREE.Mesh(new THREE.CircleGeometry(0.205, 40), lens);
  leftLens.position.set(-0.27, 0.04, -0.01);
  const rightLens = new THREE.Mesh(new THREE.CircleGeometry(0.205, 40), lens);
  rightLens.position.set(0.26, 0.04, -0.01);
  const bridge = cylinderBetween(purple, "glasses", 0.035, 0.22, [0, 0.05, 0], [0, 0, Math.PI / 2]);
  const leftArm = cylinderBetween(purple, "glasses", 0.035, 0.72, [-0.58, 0.04, -0.2], [1.22, 0.55, 0.06]);
  const rightArm = cylinderBetween(purple, "glasses", 0.035, 0.72, [0.58, 0.04, -0.2], [1.22, -0.55, -0.06]);
  [leftRing, rightRing, leftLens, rightLens].forEach((mesh) => {
    setPartOnObject(mesh, "glasses");
    mesh.castShadow = true;
  });
  glasses.add(leftRing, rightRing, leftLens, rightLens, bridge, leftArm, rightArm);

  root.traverse((object) => {
    if (object.userData.part) hitMeshes.push(object);
  });

  return { hitMeshes, parts, root };
}

export function ThreeDogMascot({
  className = "",
  motionRequest = null,
}: ThreeDogMascotProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const controlRef = useRef<null | { trigger: (part: MascotControlPart) => void }>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const host = container;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0.34, 8.2);
    camera.lookAt(0, 0.18, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0xffffff, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.width = "100%";
    renderer.domElement.setAttribute("aria-label", "Interactive 3D GlitterNGeek dog mascot");
    host.appendChild(renderer.domElement);

    const hemi = new THREE.HemisphereLight(0xffffff, 0x70407d, 2.4);
    scene.add(hemi);

    const key = new THREE.DirectionalLight(0xffffff, 4.3);
    key.position.set(-2.2, 4.6, 4.2);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);

    const fill = new THREE.PointLight(0xff9ed9, 2.2, 9);
    fill.position.set(2.8, 1.6, 3.2);
    scene.add(fill);

    const rim = new THREE.PointLight(0x9a7cff, 1.8, 8);
    rim.position.set(-2.8, 2.4, -2.6);
    scene.add(rim);

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(1.6, 64),
      new THREE.MeshBasicMaterial({
        color: 0x6d3d72,
        opacity: 0.09,
        transparent: true,
      }),
    );
    shadow.position.set(0.08, -1.78, -0.04);
    shadow.rotation.x = -Math.PI / 2;
    scene.add(shadow);

    const { hitMeshes, parts, root } = buildDogScene(scene);
    const rootBaseY = root.position.y;
    const rootBaseScale = root.scale.x;
    const cameraBaseY = camera.position.y;
    const cameraBaseZ = camera.position.z;
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(2, 2);
    const clock = new THREE.Clock();
    let hoveredPart: PartName | null = null;
    let isInside = false;
    let animationFrame = 0;

    function triggerPart(controlPart: MascotControlPart) {
      if (reduceMotion) return;

      const elapsed = clock.getElapsedTime();
      const partNames = resolveControlPart(controlPart);
      parts
        .filter((part) => partNames.includes(part.name))
        .forEach((part) => {
          randomizePart(part, elapsed, 1.45);
          part.activeUntil = elapsed + 0.95;
        });
    }

    controlRef.current = { trigger: triggerPart };

    function resize() {
      const { width, height } = host.getBoundingClientRect();
      const narrowScale = width < 560 ? 0.74 : rootBaseScale;
      const narrowCameraZ = width < 560 ? 9.35 : cameraBaseZ;

      root.scale.setScalar(narrowScale);
      camera.position.y = width < 560 ? cameraBaseY + 0.12 : cameraBaseY;
      camera.position.z = narrowCameraZ;
      camera.lookAt(0, width < 560 ? 0.08 : 0.18, 0);
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    function updatePointer(event: PointerEvent) {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      isInside = true;

      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(hitMeshes, false)[0];
      hoveredPart = (hit?.object.userData.part as PartName | undefined) ?? null;
      renderer.domElement.style.cursor = hoveredPart ? "pointer" : "default";
    }

    function clearHover() {
      isInside = false;
      hoveredPart = null;
      pointer.set(2, 2);
      renderer.domElement.style.cursor = "default";
    }

    renderer.domElement.addEventListener("pointermove", updatePointer);
    renderer.domElement.addEventListener("pointerleave", clearHover);

    const hoverQuaternion = new THREE.Quaternion();
    const baseWithOffset = new THREE.Quaternion();
    const targetPosition = new THREE.Vector3();
    const targetScale = new THREE.Vector3();

    function animate() {
      const elapsed = clock.getElapsedTime();
      const canvasHover = isInside && hoveredPart !== null && !reduceMotion;
      root.rotation.y = -0.42 + Math.sin(elapsed * 0.72) * 0.018;
      root.position.y = rootBaseY + Math.sin(elapsed * 1.15) * 0.025;
      shadow.scale.setScalar(1 + Math.sin(elapsed * 1.15) * 0.018);

      parts.forEach((part) => {
        const isHovered = canvasHover && hoveredPart === part.name;
        const isButtonActive = !reduceMotion && elapsed < part.activeUntil;
        const isActive = isHovered || isButtonActive;
        if (isHovered && elapsed > part.nextMoveAt) {
          randomizePart(part, elapsed);
        }

        const idleLift = isActive ? Math.sin(elapsed * 1.5 + part.basePosition.x) * 0.012 : 0;
        targetPosition.copy(part.basePosition);
        targetPosition.y += idleLift;

        if (isActive) {
          targetPosition.add(part.hoverOffset.position);
          hoverQuaternion.setFromEuler(part.hoverOffset.rotation);
          baseWithOffset.copy(part.baseQuaternion).multiply(hoverQuaternion);
          targetScale.setScalar(part.hoverOffset.scale);
        } else {
          baseWithOffset.copy(part.baseQuaternion);
          targetScale.setScalar(1);
        }

        part.group.position.lerp(targetPosition, isHovered ? 0.08 : 0.065);
        part.group.quaternion.slerp(baseWithOffset, isHovered ? 0.085 : 0.07);
        part.group.scale.lerp(targetScale, isHovered ? 0.07 : 0.08);
      });

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      controlRef.current = null;
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener("pointermove", updatePointer);
      renderer.domElement.removeEventListener("pointerleave", clearHover);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      host.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (!motionRequest) return;

    controlRef.current?.trigger(motionRequest.part);
  }, [motionRequest]);

  return (
    <div
      ref={containerRef}
      className={`relative min-h-[520px] w-full overflow-visible ${className}`}
    />
  );
}

export default ThreeDogMascot;
