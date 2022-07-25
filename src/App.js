import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Box from "./components/Box/Box";
import fakeData from "./assets/fakeData/data";

import "./App.css";

function App() {
  const [showBoxIndex, setShowBoxIndex] = useState(1);
  
  return (
    <div className="App">
      <Canvas className="canvas">
        <ambientLight intensity={0.5} />

        <Suspense fallback={null}>
          <Box
            data={fakeData[showBoxIndex - 1]}
            setShowBoxIndex={setShowBoxIndex}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
