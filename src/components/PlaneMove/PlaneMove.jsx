import React from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { DoubleSide } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

import * as THREE from "three";

function PlaneMove(props) {
  const circleMove = useLoader(TextureLoader, "./images/circleMove.png");
  const plane = useRef();
  const pointer = new THREE.Vector2();
  const { camera, raycaster, scene } = useThree();

  let circlePointerMove = {};

  function onPointerMove(event) {
    event.preventDefault();
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    circlePointerMove = {
      x: intersects[0].point.x,
      y: intersects[0].point.y,
      z: intersects[0].point.z,
    };
  }

  useFrame(() => {
    if (circlePointerMove.z >= 49 || circlePointerMove.z <= -49) {
      plane.current.position.set(
        circlePointerMove.x,
        circlePointerMove.y,
        circlePointerMove.z
      );
      plane.current.rotation.set(0, 0, 0);
    } else if (circlePointerMove.x >= 49 || circlePointerMove.x <= -49) {
      plane.current.position.set(
        circlePointerMove.x,
        circlePointerMove.y,
        circlePointerMove.z
      );
      plane.current.rotation.set(0, Math.PI / 2, 0);
    } else if (circlePointerMove.y >= 49 || circlePointerMove.y <= -49) {
      plane.current.position.set(
        circlePointerMove.x,
        circlePointerMove.y,
        circlePointerMove.z
      );
      plane.current.rotation.set(Math.PI / 2, 0, 0);
    } else plane.current.rotation.set(0, 0, 0);
  });

  window.addEventListener("mousemove", onPointerMove);

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

export default PlaneMove;
