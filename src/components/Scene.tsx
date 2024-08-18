import React, { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Colors = {
  red: 0xf25346,
  yellow: 0xedeb27,
  white: 0xd8d0d1,
  brown: 0x59332e,
  pink: 0xf5986e,
  brownDark: 0x23190f,
  blue: 0x68c3c0,
  green: 0x458248,
  purple: 0x551A8B,
  lightgreen: 0x629265,
};

const SceneSetup = () => {
  const { scene, camera, gl } = useThree();

  useEffect(() => {
    camera.position.set(0, 150, 100);
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
    gl.setSize(window.innerWidth, window.innerHeight);
    gl.setPixelRatio(window.devicePixelRatio);
    gl.shadowMap.enabled = true;
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      gl.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [camera, gl, scene]);

  return null;
};

const Lights = () => {
  return (
    <>
      <hemisphereLight 
        args={[0xaaaaaa, 0x000000, 0.9]} 
        position={[0, 100, 0]}
      />
      <directionalLight
        castShadow
        position={[0, 350, 350]}
        intensity={0.9}
        shadow-camera-left={-650}
        shadow-camera-right={650}
        shadow-camera-top={650}
        shadow-camera-bottom={-650}
        shadow-camera-near={1}
        shadow-camera-far={1000}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
    </>
  );
};

const Land = () => (
  <cylinderGeometry args={[600, 600, 1700, 40, 10]}>
    <meshPhongMaterial attach="material" color={Colors.lightgreen} flatShading />
  </cylinderGeometry>
);

// const Cloud = () => {
//   const cloud = useRef<THREE.Mesh | null>(null) as React.MutableRefObject<THREE.Mesh | null>;
//   const nBlocs = 3 + Math.floor(Math.random() * 3);

//   useEffect(() => {
//     for (let i = 0; i < nBlocs; i++) {
//       const m = new THREE.Mesh(
//         new THREE.DodecahedronGeometry(20, 0),
//         new THREE.MeshPhongMaterial({ color: Colors.white })
//       );
//       m.position.set(i * 15, Math.random() * 10, Math.random() * 10);
//       m.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, 0);
//       const s = 0.1 + Math.random() * 0.9;
//       m.scale.set(s, s, s);
//       cloud.current.add(m);
//     }
//   }, [nBlocs]);

//   return <group ref={cloud} />;
// };

// const Sky = () => {
//   const nClouds = 25;
//   const stepAngle = (Math.PI * 2) / nClouds;
//   const sky = useRef();

//   useEffect(() => {
//     for (let i = 0; i < nClouds; i++) {
//       const c = new Cloud();
//       const a = stepAngle * i;
//       const h = 800 + Math.random() * 200;
//       c.mesh.position.set(Math.cos(a) * h, Math.sin(a) * h, -400 - Math.random() * 400);
//       c.mesh.rotation.z = a + Math.PI / 2;
//       const s = 1 + Math.random() * 2;
//       c.mesh.scale.set(s, s, s);
//       sky.current.add(c.mesh);
//     }
//   }, [nClouds, stepAngle]);

//   return <group ref={sky} />;
// };

const Tree = (props) => (
    <group {...props}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[10, 20, 10]} />
        <meshPhongMaterial color={Colors.brown} />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 20, 0]}>
        <cylinderGeometry args={[1, 36, 36, 4]} />
        <meshPhongMaterial color={Colors.green} flatShading />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 40, 0]}>
        <cylinderGeometry args={[1, 27, 27, 4]} />
        <meshPhongMaterial color={Colors.green} flatShading />
      </mesh>
      <mesh castShadow receiveShadow position={[0, 55, 0]}>
        <cylinderGeometry args={[1, 18, 18, 4]} />
        <meshPhongMaterial color={Colors.green} flatShading />
      </mesh>
    </group>
  );

const Flower = (props) => {
  const petalColors = [Colors.red, Colors.yellow, Colors.blue];
  const petalColor = petalColors[Math.floor(Math.random() * 3)];

  return (
    <group {...props}>
      <mesh receiveShadow>
        <boxGeometry args={[5, 50, 5]} />
        <meshPhongMaterial color={Colors.green} flatShading />
      </mesh>
      <mesh receiveShadow position={[0, 25, 3]}>
        <boxGeometry args={[10, 10, 10]} />
        <meshPhongMaterial color={Colors.yellow} flatShading />
      </mesh>
      {[...Array(4)].map((_, i) => (
        <mesh
          key={i}
          receiveShadow
          castShadow
          position={[
            Math.cos((Math.PI / 2) * i) * 12.5,
            Math.sin((Math.PI / 2) * i) * 12.5,
            0,
          ]}
        >
          <boxGeometry args={[15, 20, 5]} />
          <meshBasicMaterial color={petalColor} />
        </mesh>
      ))}
    </group>
  );
};
const Forest = () => {
    const nTrees = 300;
    const nFlowers = 350;
    const stepAngleTree = (Math.PI * 2) / nTrees;
    const stepAngleFlower = (Math.PI * 2) / nFlowers;
  
    // Generate tree and flower positions and rotations
    const trees = useMemo(() => {
      return new Array(nTrees).fill().map((_, i) => {
        const a = stepAngleTree * i;
        const h = 605;
        return {
          position: [Math.cos(a) * h, Math.sin(a) * h, 0 - Math.random() * 600],
          rotation: [0, 0, a + (Math.PI / 2) * 3],
          scale: 0.3 + Math.random() * 0.75,
        };
      });
    }, [nTrees, stepAngleTree]);
  
    const flowers = useMemo(() => {
      return new Array(nFlowers).fill().map((_, i) => {
        const a = stepAngleFlower * i;
        const h = 605;
        return {
          position: [Math.cos(a) * h, Math.sin(a) * h, 0 - Math.random() * 600],
          rotation: [0, 0, a + (Math.PI / 2) * 3],
          scale: 0.1 + Math.random() * 0.3,
        };
      });
    }, [nFlowers, stepAngleFlower]);
  
    return (
      <group>
        {trees.map((tree, index) => (
          <Tree
            key={`tree-${index}`}
            position={tree.position}
            rotation={tree.rotation}
            scale={tree.scale}
          />
        ))}
        {flowers.map((flower, index) => (
          <Flower
            key={`flower-${index}`}
            position={flower.position}
            rotation={flower.rotation}
            scale={flower.scale}
          />
        ))}
      </group>
    );
  };

const Scene = () => (
  <Canvas shadows>
    <SceneSetup />
    <Lights />
    <OrbitControls />
    {/* <Sky /> */}
    <Forest />
  </Canvas>
);

export default Scene;
