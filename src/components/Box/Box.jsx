import React, { memo, useCallback, useEffect, useRef } from "react";
import { BackSide, Vector3 } from "three";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";
import PlaneFixed from "../PlaneFixed/PlaneFixed";
import PlaneMove from "../PlaneMove/PlaneMove";
import { degToRad } from "three/src/math/MathUtils";

function Box(props) {
  const { images, hotspots } = props.data;
  const mesh = useRef();
  const textures = useLoader(TextureLoader, images);
  let pointerMove = useRef(false);
  let activeRotation = useRef([0, 0, 0]);
  let vectorsArr = [];
  let stateCameraArr = [];
  hotspots.forEach((item) => {
    const vector = new Vector3(
      item.hotspot[0],
      item.hotspot[1],
      item.hotspot[2]
    );
    vectorsArr.push(vector);
  });

  const handleClick = useCallback(
    (e) => {
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
      // console.log(activeRotation.current);
    },
    [hotspots, pointerMove.current, props, vectorsArr]
  );

  // useFrame((e) => {
  //   console.log(e);
  //   const stateCamera = Math.round(
  //     (Math.abs(e.camera.rotation._x) +
  //       Math.abs(e.camera.rotation._y) +
  //       Math.abs(e.camera.rotation._z)) *
  //       10
  //   );
  //   stateCameraArr.push(stateCamera);
  //   const prevState = stateCameraArr[stateCameraArr.length - 5];
  //   const nextState = stateCameraArr[stateCameraArr.length - 1];
  //   console.log(prevState === nextState);
  //   if (prevState === nextState) pointerMove.current = true;
  // });

  const handleMouseMove = (e) => {
    e.stopPropagation();
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
      }, 50);
    };

    const handleMouseUp = (e) => {
      e.stopPropagation();
      clearInterval(mouseDown);
      if (timer < 2) return (pointerMove.current = true);
      else return (pointerMove.current = false);
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <mesh
      ref={mesh}
      onClick={(e) => handleClick(e)}
      onPointerMove={(e) => handleMouseMove(e)}
      position={[0, 0, 0]}
      rotation={[0, 0, 0]}
      scale={1}
    >
      <boxBufferGeometry attach="geometry" args={[1000, 1000, 1000]} />

      {/* <meshNormalMaterial side={BackSide} /> */}

      {textures.map((item, index) => (
        <meshPhongMaterial
          attachArray="material"
          side={BackSide}
          map={item}
          key={index}
        />
      ))}

      {hotspots.map((hotspot, index) => (
        <PlaneFixed
          hotspot={hotspot}
          setShowBoxIndex={props.setShowBoxIndex}
          key={index}
        />
      ))}

      <PlaneMove />
    </mesh>
  );
}

export default memo(Box);
