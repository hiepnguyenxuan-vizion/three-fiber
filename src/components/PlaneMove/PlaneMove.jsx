import React, { memo, useEffect, useRef } from "react";
import { DoubleSide } from "three";
import { useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import * as THREE from "three";

function PlaneMove(props) {
  const circleMove = useLoader(TextureLoader, "./images/circleMove.png");
  const plane = useRef();
  const pointer = new THREE.Vector2();
  const { camera, raycaster, scene, size } = useThree();
  const stayPosition = new THREE.Vector3(0, -500, 0);
  let factorScale;
  let circlePointerMove = {};
  let isResponsive = useRef(false);

  function onPointerMove(event) {
    event.preventDefault();
    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    circlePointerMove = {
      x: intersects[0]?.point.x,
      y: intersects[0]?.point.y,
      z: intersects[0]?.point.z,
    };

    if (isResponsive.current || !plane.current) return;
    if (circlePointerMove.y >= -100) {
      plane.current.position.set(
        circlePointerMove.x,
        circlePointerMove.y,
        circlePointerMove.z
      );
      factorScale = 500 / stayPosition.distanceTo(plane.current.position);
      factorScale = factorScale * factorScale * 1.1;
      plane.current.scale.set(factorScale, factorScale, factorScale);
    } else if (
      circlePointerMove.z >= 500 ||
      circlePointerMove.z <= -500 ||
      circlePointerMove.x <= -500 ||
      circlePointerMove.x >= 500
    ) {
      plane.current.position.set(
        circlePointerMove.x,
        circlePointerMove.y,
        circlePointerMove.z
      );
      factorScale = 500 / stayPosition.distanceTo(plane.current.position);
      factorScale = factorScale * factorScale * 1.1;
      plane.current.scale.set(factorScale, factorScale, factorScale);
    } else if (circlePointerMove.y <= -500) {
      plane.current.position.set(
        circlePointerMove.x,
        circlePointerMove.y,
        circlePointerMove.z
      );
      plane.current.scale.set(1, 1, 1);
    }
  }

  useEffect(() => {
    (function responsivePlaneMove() {
      if (size.width < 768) {
        isResponsive.current = true;
        plane.current.scale.set(0, 0, 0);
      }
    })();
  }, [size.width]);

  window.addEventListener("mousemove", onPointerMove);

  return (
    <mesh ref={plane} rotation={[Math.PI / 2, 0, 0]} position={[0, -499, 0]}>
      <planeBufferGeometry attach="geometry" args={[100, 100, 100]} />
      <meshBasicMaterial
        attach="material"
        map={circleMove}
        side={DoubleSide}
        transparent
      />
    </mesh>
  );
}

export default memo(PlaneMove);
