import React, { createRef, useEffect, useRef, useState } from "react";
import { BackSide, Vector2, Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import PlaneFixed from "../PlaneFixed/PlaneFixed";
import PlaneMove from "../PlaneMove/PlaneMove";
import { degToRad } from "three/src/math/MathUtils";
import * as THREE from "three";
import fakeData, { TexturesLoader } from "../../assets/fakeData/data";

import gsap from "gsap";

function Box(props) {
  const [showBoxIndex, setShowBoxIndex] = useState(1);
  const { camera, raycaster, scene } = useThree();
  const pointerCenter = new Vector2(0, 0);
  const mesh = useRef();
  const arrLength = fakeData.length;
  const [mainMeshs, setMainMeshs] = useState([]);
  const controlsRef = useRef();
  let pointerMove = useRef(false);
  let activeRotation = useRef();
  let pointerUpArrow = useRef();
  let vectorsArr = [];
  let hotspots = fakeData[showBoxIndex - 1].hotspots;

  for (let item of hotspots) {
    const vector = new Vector3(
      item.hotspot[0],
      item.hotspot[1],
      item.hotspot[2]
    );
    vectorsArr.push(vector);
  }

  for (let item of fakeData) {
    item.textures = TexturesLoader(item.images);
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

    // handleFadeOut(hotspots[indexMove].boxID);
    setShowBoxIndex(hotspots[indexMove].boxID);
    activeRotation.current = hotspots[indexMove].defaultRotation;
    handleFadeIn(hotspots[indexMove].boxID);

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

    setShowBoxIndex(hotspots[indexMove].boxID);
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
    setMainMeshs((elRefs) =>
      Array(arrLength)
        .fill()
        .map((_, i) => elRefs[i] || createRef())
    );
  }, [arrLength]);

  const handleFadeOut = (boxID) => {
    // console.log(boxID);
    for (let item of mainMeshs[boxID - 1]?.current?.material) {
      item.visible = false;
    }
    const materials = mainMeshs[boxID - 1]?.current?.material;

    gsap.from(materials, {
      opacity: 1,
      duration: 5,
    });

    gsap.to(materials, {
      opacity: 0.5,
      duration: 5,
    });
  };

  const handleFadeIn = (boxID) => {
    // console.log(boxID);
    for (let item of mainMeshs[boxID - 1]?.current?.material) {
      item.visible = true;
    }
    const materials = mainMeshs[boxID - 1]?.current?.material;

    gsap.from(materials, {
      opacity: 0.6,
      duration: 1.5,
    });

    gsap.to(materials, {
      opacity: 1,
      duration: 1.5,
    });
  };

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

      {fakeData.map((box, boxIndex) => (
        <mesh ref={mainMeshs[boxIndex]} key={boxIndex} name={box.name}>
          <boxBufferGeometry attach="geometry" args={[1100, 1100, 1100]} />

          {box.textures?.map((item, textureIndex) => (
            <meshPhongMaterial
              attachArray="material"
              side={BackSide}
              map={item}
              // opacity={showBoxIndex - 1 === boxIndex ? 1 : 0}
              visible={showBoxIndex - 1 === boxIndex ? true : false}
              key={textureIndex}
            />
          ))}
        </mesh>
      ))}

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
            setShowBoxIndex={setShowBoxIndex}
            key={index}
          />
        ))}

        <PlaneMove />
      </mesh>
    </>
  );
}

export default Box;
