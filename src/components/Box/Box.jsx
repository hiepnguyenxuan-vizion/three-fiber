import React, { useEffect, useRef } from "react";
import { BackSide, Vector2, Vector3 } from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import PlaneFixed from "../PlaneFixed/PlaneFixed";
import PlaneMove from "../PlaneMove/PlaneMove";
import { degToRad } from "three/src/math/MathUtils";
import * as THREE from "three";

function Box(props) {
  const { images, hotspots } = props.data;
  const { camera, raycaster, scene } = useThree();
  const pointerCenter = new Vector2(0, 0);
  const mesh = useRef();
  const controlsRef = useRef();
  const textures = useLoader(TextureLoader, images);
  let pointerMove = useRef(false);
  let activeRotation = useRef();
  let pointerUpArrow = useRef();
  let vectorsArr = [];

  for (let item of hotspots) {
    const vector = new Vector3(
      item.hotspot[0],
      item.hotspot[1],
      item.hotspot[2]
    );
    vectorsArr.push(vector);
  }

  const handleClick = (e) => {
    e.stopPropagation();

    if (!pointerMove.current) return;

    let indexMove;
    let dMin;

    for (let i = 0; i < vectorsArr.length - 1; i++) {
      const d1 = e.point.distanceTo(vectorsArr[i]);
      const d2 = e.point.distanceTo(vectorsArr[i + 1]);
      if (d1 <= d2) {
        dMin = d1;
        indexMove = i;
      } else {
        dMin = d2;
        indexMove = i + 1;
      }
    }

    props.setShowBoxIndex(hotspots[indexMove].boxID);
    activeRotation.current = hotspots[indexMove].defaultRotation;

    handleCameraRotation(
      activeRotation.current[0],
      activeRotation.current[1],
      activeRotation.current[2]
    );
  };

  const handleUpArrow = (e) => {
    e.preventDefault();

    if (e.keyCode !== 38) return;
    let indexMove;
    let dMin;

    for (let i = 0; i < vectorsArr.length - 1; i++) {
      const d1 = pointerUpArrow.current.distanceTo(vectorsArr[i]);
      const d2 = pointerUpArrow.current.distanceTo(vectorsArr[i + 1]);
      if (d1 < d2) {
        dMin = d1;
        indexMove = i;
      } else if (d2 <= d1) {
        dMin = d2;
        indexMove = i + 1;
      }
    }

    props.setShowBoxIndex(hotspots[indexMove].boxID);
    activeRotation.current = hotspots[indexMove].defaultRotation;

    handleCameraRotation(
      activeRotation.current[0],
      activeRotation.current[1],
      activeRotation.current[2]
    );
  };

  const handleCameraRotation = (x = 0, y = degToRad(-135), z = 0) => {
    const direction = new THREE.Vector3();
    camera.rotation.set(x, y, z);
    camera.getWorldDirection(direction);
    camera.getWorldPosition(controlsRef.current.target);
    controlsRef.current.target.addScaledVector(direction, 1);
    controlsRef.current.update();
  };

  useFrame((event) => {
    raycaster.setFromCamera(pointerCenter, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    const vectorMouseCenter = new Vector3(
      intersects[0]?.point.x,
      intersects[0]?.point.y,
      intersects[0]?.point.z
    );

    pointerUpArrow.current = vectorMouseCenter;
  });

  useEffect(() => {
    window.addEventListener("keyup", handleUpArrow);

    return () => {
      window.removeEventListener("keyup", handleUpArrow);
    };
  });

  useEffect(() => {
    let timer = 0;
    let mouseDown;
    const handleMouseDown = (e) => {
      e.stopPropagation();
      let countTimer = 0;
      mouseDown = setInterval(() => {
        timer = ++countTimer;
        return (pointerMove.current = false);
      }, 20);
    };

    const handleMouseUp = (e) => {
      e.stopPropagation();
      // console.log("mouseUp", timer);
      clearInterval(mouseDown);
      if (timer < 6) return (pointerMove.current = true);
      else return (pointerMove.current = false);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    handleCameraRotation();

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      <PerspectiveCamera />
      <OrbitControls ref={controlsRef} enableZoom={false} enableRotate={true} />
      <mesh>
        <boxBufferGeometry attach="geometry" args={[1100, 1100, 1100]} />

        {textures.map((item, index) => (
          <meshPhongMaterial
            attachArray="material"
            side={BackSide}
            map={item}
            key={index}
            opacity={1}
          />
        ))}
      </mesh>
      <mesh
        ref={mesh}
        onClick={(e) => handleClick(e)}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={1}
      >
        <boxBufferGeometry attach="geometry" args={[1000, 1000, 1000]} />

        <meshBasicMaterial
          attach="material"
          side={BackSide}
          opacity={0}
          transparent
          visible={false}
        />

        {hotspots.map((hotspot, index) => (
          <PlaneFixed
            hotspot={hotspot}
            setShowBoxIndex={props.setShowBoxIndex}
            key={index}
          />
        ))}

        <PlaneMove />
      </mesh>
    </>
  );
}

export default Box;
