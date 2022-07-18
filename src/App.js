import React, { Suspense, useState } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Box from "./components/Box/Box";
import * as THREE from "three";

import fakeData from "./assets/fakeData/data";

import "./App.css";

function App() {
  const [showBoxIndex, setShowBoxIndex] = useState(1);

  return (
    <div className="App">
      <Canvas className="canvas">
        <ambientLight intensity={0.4} />

        <OrbitControls enableZoom={false} />
        <PerspectiveCamera position={[0, 0, 0]} />

        <Suspense fallback={null}>
          <Box
            data={fakeData[showBoxIndex - 1]}
            setShowBoxIndex={setShowBoxIndex}
          />

          {/* <group>
            <Plane />
          </group> */}
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
