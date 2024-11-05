import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";
import "./App.css";


export default function App() {
  return (
    <div className="App" style={{ height: '100%' }}>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={1} />
          <directionalLight position={[0, 0, 5]} rotateZ={0} intensity={0.9} />
          <color attach="background" args={['white']} />
          <Model />
          <OrbitControls minDistance={3} maxDistance={7}/>
          {/* <Environment preset="sunset" background /> */}
        </Suspense>
      </Canvas>
    </div>
  );
}

const Model = () => {
  const gltf = useLoader(GLTFLoader, "./guitar.gltf");
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      // id: 24 is the body of the guitar
      if(child.id === 24){
        child.material.color.set('#00ff00');
      }
      console.log(child.id ,child.material.color)
      // child.material.color.set('#00ff00'); // Change to desired color
    }
  });
  // console.log(gltf);

  // gltf.scene.materials['000_1']
  return (
    <>
      <OrbitControls />
      <primitive object={gltf.scene} scale={0.006} />
    </>
  );
};