import React from "react";
import { DoubleSide } from "three";
import PlaneMove from "../PlaneMove/PlaneMove";

function Plane() {
  return (
    <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1}>
      <planeBufferGeometry attach="geometry" args={[5, 5, 5]} />
      <meshBasicMaterial attach="material" side={DoubleSide} color="blue" />

      <PlaneMove />
    </mesh>
  );
}

export default Plane;
