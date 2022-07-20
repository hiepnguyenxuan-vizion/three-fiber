import React, { memo, useEffect, useRef } from "react";
import { DoubleSide } from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import * as THREE from "three";

function PlaneMove(props) {
  const circleMove = useLoader(TextureLoader, "./images/circleMove.png");
  const plane = useRef();
  const pointer = new THREE.Vector2();
  const { camera, raycaster, scene, viewport } = useThree();
  const stayPosition = new THREE.Vector3(0, -500, 0);
  let factorScale = 1;
  let circlePointerMove = {};
  let isResponsive = useRef(false);

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

  useFrame((e) => {
    if (isResponsive.current) return;
    if (circlePointerMove.z >= 480) {
      plane.current.position.set(
        circlePointerMove.x,
        circlePointerMove.y,
        circlePointerMove.z - 50
      );
      factorScale = 400 / stayPosition.distanceTo(plane.current.position);
      plane.current.scale.set(factorScale, factorScale, factorScale);
      plane.current.rotation.set(-Math.PI / 2, 0, 0);
    } else if (circlePointerMove.z <= -480) {
      plane.current.position.set(
        circlePointerMove.x,
        circlePointerMove.y,
        circlePointerMove.z + 50
      );
      factorScale = 400 / stayPosition.distanceTo(plane.current.position);
      plane.current.scale.set(factorScale, factorScale, factorScale);
      plane.current.rotation.set(-Math.PI / 2, 0, 0);
    } else if (circlePointerMove.x <= -480) {
      plane.current.position.set(
        circlePointerMove.x + 50,
        circlePointerMove.y,
        circlePointerMove.z
      );
      factorScale = 400 / stayPosition.distanceTo(plane.current.position);
      plane.current.scale.set(factorScale, factorScale, factorScale);
      plane.current.rotation.set(Math.PI / 2, 0, 0);
    } else if (circlePointerMove.x >= 480) {
      plane.current.position.set(
        circlePointerMove.x - 50,
        circlePointerMove.y,
        circlePointerMove.z
      );
      factorScale = 400 / stayPosition.distanceTo(plane.current.position);
      plane.current.scale.set(factorScale, factorScale, factorScale);
      plane.current.rotation.set(Math.PI / 2, 0, 0);
    } else if (circlePointerMove.y <= -480) {
      plane.current.position.set(
        circlePointerMove.x,
        circlePointerMove.y + 1,
        circlePointerMove.z
      );
      plane.current.scale.set(1, 1, 1);
      plane.current.rotation.set(Math.PI / 2, 0, 0);
    } else if (circlePointerMove.y >= 480) {
      plane.current.position.set(
        circlePointerMove.x,
        circlePointerMove.y - 1,
        circlePointerMove.z
      );
      plane.current.scale.set(1, 1, 1);
      plane.current.rotation.set(Math.PI / 2, 0, 0);
    } else plane.current.rotation.set(0, 0, 0);
  });

  useEffect(() => {
    (function responsivePlaneMove() {
      const responsiveWidth = viewport.factor * viewport.width;
      if (responsiveWidth < 768) {
        isResponsive.current = true;
        plane.current.scale.set(0, 0, 0);
      }
    })();
  }, [viewport.factor, viewport.width]);

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
