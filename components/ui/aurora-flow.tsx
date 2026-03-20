"use client";

import React, { useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const AuroraBackground = () => {
  const { scene } = useThree();

  useEffect(() => {
    const geometry = new THREE.PlaneGeometry(200, 200);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        resolution: {
          value: new THREE.Vector2(window.innerWidth, window.innerHeight),
        },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec2 resolution;
        varying vec2 vUv;

        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

        float snoise(vec2 v) {
          const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                             -0.577350269189626, 0.024390243902439);
          vec2 i  = floor(v + dot(v, C.yy));
          vec2 x0 = v - i + dot(i, C.xx);
          vec2 i1;
          i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
          vec4 x12 = x0.xyxy + C.xxzz;
          x12.xy -= i1;
          i = mod289(i);
          vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
            + i.x + vec3(0.0, i1.x, 1.0));
          vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
          m = m*m; m = m*m;
          vec3 x = 2.0 * fract(p * C.www) - 1.0;
          vec3 h = abs(x) - 0.5;
          vec3 ox = floor(x + 0.5);
          vec3 a0 = x - ox;
          m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
          vec3 g;
          g.x  = a0.x  * x0.x  + h.x  * x0.y;
          g.yz = a0.yz * x12.xz + h.yz * x12.yw;
          return 130.0 * dot(m, g);
        }

        void main() {
          vec2 uv = vUv;

          float flow1 = snoise(vec2(uv.x * 2.0 + time * 0.08, uv.y * 0.5 + time * 0.04));
          float flow2 = snoise(vec2(uv.x * 1.5 + time * 0.06, uv.y * 0.8 + time * 0.03));
          float flow3 = snoise(vec2(uv.x * 3.0 + time * 0.10, uv.y * 0.3 + time * 0.05));

          float streaks = sin((uv.x + flow1 * 0.3) * 8.0 + time * 0.15) * 0.5 + 0.5;
          streaks *= sin((uv.y + flow2 * 0.2) * 12.0 + time * 0.12) * 0.5 + 0.5;

          float aurora = (flow1 + flow2 + flow3) * 0.33 + 0.5;
          aurora = pow(aurora, 2.0);

          // MVZ Südwest brand blues
          vec3 darkNavy   = vec3(0.10, 0.16, 0.23);   // #1a2a3a
          vec3 deepBlue   = vec3(0.18, 0.47, 0.76);   // #2d78c3
          vec3 medBlue    = vec3(0.24, 0.65, 0.88);   // #3ca5e1
          vec3 skyBlue    = vec3(0.29, 0.76, 0.94);   // #4bc3f0
          vec3 paleBlue   = vec3(0.71, 0.88, 0.94);   // #b4e1f0

          vec3 color = darkNavy;

          float deepFlow = smoothstep(0.3, 0.7, aurora + streaks * 0.3);
          color = mix(color, deepBlue, deepFlow);

          float medFlow = smoothstep(0.55, 0.85, aurora + flow1 * 0.4);
          color = mix(color, medBlue, medFlow);

          float skyFlow = smoothstep(0.75, 1.0, streaks + aurora * 0.5);
          color = mix(color, skyBlue, skyFlow * 0.75);

          float paleFlow = smoothstep(0.85, 1.0, flow3 + streaks * 0.25);
          color = mix(color, paleBlue, paleFlow * 0.4);

          float noise = snoise(uv * 100.0) * 0.015;
          color += noise;

          gl_FragColor = vec4(color, 1.0);
        }
      `,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -50;
    scene.add(mesh);

    let animId: number;
    const animate = () => {
      material.uniforms.time.value += 0.008;
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
    };
  }, [scene]);

  return null;
};

const CameraController = () => {
  const { camera } = useThree();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    camera.position.x = Math.sin(t * 0.04) * 2.5;
    camera.position.y = Math.cos(t * 0.06) * 1.5;
    camera.position.z = 30;
    camera.lookAt(0, 0, -30);
  });
  return null;
};

export const AuroraCanvas = () => (
  <Canvas
    camera={{ position: [0, 0, 30], fov: 75 }}
    gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
  >
    <AuroraBackground />
    <CameraController />
    <ambientLight intensity={0.9} />
    <pointLight position={[20, 20, 10]} intensity={0.8} color="#3ca5e1" distance={100} decay={2} />
    <pointLight position={[-20, -10, 5]} intensity={0.6} color="#4bc3f0" distance={80} decay={2} />
  </Canvas>
);
