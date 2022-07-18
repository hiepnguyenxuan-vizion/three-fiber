import React from "react";
import { useLoader } from "@react-three/fiber";
import { DoubleSide } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

function PlaneFixed(props) {
  const circleFixed = useLoader(TextureLoader, "./images/circleFixed.png");

  return (
    <mesh
      onClick={() => props.setShowBoxIndex(props.hotspot.boxID)}
      rotation={[-Math.PI / 2, 0, 0]}
      position={props.hotspot.hotspot}
      scale={1}
    >
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

export default PlaneFixed;
