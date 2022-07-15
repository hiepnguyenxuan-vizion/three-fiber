import React, { useEffect } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { BackSide, DoubleSide, PlaneBufferGeometry } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

import * as THREE from "three";
import "./App.css";
// import { getCamCoordFromOrientation } from "./utils";

function PlaneFixed(props) {
  const circleFixed = useLoader(TextureLoader, "./images/circleFixed.png");

  return (
    <mesh rotation={props.item.rotation} position={props.item.position}>
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <meshBasicMaterial
        attach="material"
        map={circleFixed}
        transparent
        opacity={0.8}
        side={DoubleSide}
      />
    </mesh>
  );
}

function PlaneMove(props) {
  const circleMove = useLoader(TextureLoader, "./images/circleMove.png");
  const plane = useRef();

  const { camera, raycaster, scene } = useThree();

  console.log(camera, raycaster, scene);
  // function onPointerMove(event) {
  //   // calculate pointer position in normalized device coordinates
  //   // (-1 to +1) for both components

  //   pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  //   pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  // }

  // raycaster.setFromCamera(pointer, PerspectiveCamera);

  // const intersects = raycaster.intersectObjects();

  // for (let i = 0; i < intersects.length; i++) {
  //   intersects[i].object.material.color.set(0xff0000);
  // }

  return (
    <mesh ref={plane} rotation={[0, 0, 0]} position={[0, 0, -50]} scale={1}>
      <planeBufferGeometry attach="geometry" args={[10, 10, 10]} />
      <meshBasicMaterial
        attach="material"
        map={circleMove}
        transparent
        side={DoubleSide}
      />
    </mesh>
  );
}

function Box(props) {
  const mesh = useRef();
  const textures = useLoader(TextureLoader, [
    "./images/px.jpg",
    "./images/nx.jpg",
    "./images/py.jpg",
    "./images/ny.jpg",
    "./images/pz.jpg",
    "./images/nz.jpg",
  ]);

  const circles = [
    {
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -49, 0],
    },
    {
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -49, 45],
    },
    {
      rotation: [-Math.PI / 2, 0, 0],
      position: [-45, -49, -35],
    },
  ];

  return (
    <mesh ref={mesh} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1}>
      <boxBufferGeometry attach="geometry" args={[100, 100, 100]} />

      <meshNormalMaterial attach="material" side={BackSide} />

      {/* {textures.map((item, index) => (
        <meshPhongMaterial
          attachArray="material"
          side={BackSide}
          map={item}
          key={index}
        />
      ))} */}

      {circles.map((item, index) => (
        <PlaneFixed item={item} key={index} />
      ))}

      <PlaneMove />
    </mesh>
  );
}

function Plane() {
  return (
    <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1}>
      <planeBufferGeometry attach="geometry" args={[5, 5, 5]} />
      <meshBasicMaterial attach="material" side={DoubleSide} color="blue" />

      <PlaneMove />
    </mesh>
  );
}

function App() {
  return (
    <div className="App">
      <Canvas className="canvas">
        <ambientLight intensity={0.4} />

        <OrbitControls target={[0, 0, 0]} enableZoom={false} />
        <PerspectiveCamera position={[0, 0, 0]} />
        <Suspense fallback={null}>
          <Box />

          {/* <group>
            <Plane />
          </group> */}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
