import React, { Suspense, useState } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Box from "./components/Box/Box";
import fakeData from "./assets/fakeData/data";

import "./App.css";
import { degToRad } from "three/src/math/MathUtils";

function App() {
  const [showBoxIndex, setShowBoxIndex] = useState(1);

  return (
    <div className="App">
      <Canvas className="canvas">
        <ambientLight intensity={0.5} />

        <OrbitControls enableZoom={false} rotation={[0, degToRad(135), 0]} />
        <PerspectiveCamera />

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
