import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import Box from "./components/Box/Box";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Canvas className="canvas">
        <ambientLight intensity={0.8} />

        <Suspense fallback={null}>
          <Box />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
