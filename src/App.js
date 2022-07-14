import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { BackSide } from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader.js";

import "./App.css";

function Box(props) {
  const mesh = useRef();
  const textures = useLoader(TextureLoader, [
    "./images/px.jpg",
    "./images/nx.jpg",
    "./images/py.jpg",
    "./images/ny.jpg",
    "./images/pz.jpg",
    "./images/nz.jpg",
  ]);

  // useFrame(() => {
  //   mesh.current.rotation.x = mesh.current.rotation.y += 0.005;
  // });

  return (
    <mesh ref={mesh} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1}>
      <boxBufferGeometry attach="geometry" args={[1000, 1000, 1000]} />

      {textures.map((item, index) => (
        <meshPhongMaterial
          attachArray="material"
          side={BackSide}
          map={item}
          key={index}
        />
      ))}
    </mesh>
  );
}

function App() {
  return (
    <div className="App">
      <Canvas className="canvas">
        <ambientLight intensity={0.5} />

        <OrbitControls target={[0, 0, 0]} enableZoom={false} />
        <PerspectiveCamera position={[0, 0, 0]} />
        <Suspense fallback={null}>
          <Box />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
