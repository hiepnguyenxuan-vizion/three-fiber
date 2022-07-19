import React from "react";
import { DoubleSide } from "three";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

function PlaneFixed(props) {
  const { boxID, hotspot, rotation, scale } = props.hotspot;
  const circleFixed = useLoader(TextureLoader, "./images/circleFixed.png");

  return (
    <mesh
      onClick={() => props.setShowBoxIndex(boxID)}
      rotation={rotation}
      position={hotspot}
      scale={scale}
    >
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <meshBasicMaterial
        attach="material"
        map={circleFixed}
        transparent
        opacity={1}
        side={DoubleSide}
      />
    </mesh>
  );
}

export default PlaneFixed;
