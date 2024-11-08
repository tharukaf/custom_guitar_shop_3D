
import { useLoader } from "@react-three/fiber";
import { useState } from "react";
import Canvas3D from "./components/canvas3d";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import "./App.css";
import Container from "@mui/material/Container";
import BackgroundColorButtons from "./components/backgroundColorButtonGroup";
import { initGuitarConfig } from "./util/initGuitar.mjs";
import GlassmorphicSection from "./components/glassmorphicSection";

export default function App() {
  const [background, setBackground] = useState("white");
  const [guitar, setGuitar] = useState(initGuitarConfig);

  function changeBackground(color) {
    setBackground(color);
  }

  return (
    <div className="App" style={{ height: "100%" }}>
      <header
        id="header"
      >
        hello
      </header>
      <div className="main-grid">
        <Canvas3D background={background} />
        <div className="customizerSectionContainer">
          <Container className="customizerSection">
            <BackgroundColorButtons changeBackground={changeBackground} />
            <GlassmorphicSection title="Orientation">
              this is a glassmorphic section
            </GlassmorphicSection>
            <GlassmorphicSection title="Body Color">
              this is a glassmorphic section
            </GlassmorphicSection>
            <GlassmorphicSection title="Neck Material">
              this is a glassmorphic section
            </GlassmorphicSection>
            <GlassmorphicSection title="Headstock Color">
              this is a glassmorphic section
            </GlassmorphicSection>
            <GlassmorphicSection title="Pickup Material">
              this is a glassmorphic section
            </GlassmorphicSection>
          </Container>
        </div>
      </div>
    </div>
  );
}



export function Model() {
  const gltf = useLoader(GLTFLoader, "./guitar.gltf");
  gltf.scene.position.y = -1.5;
  // mirror the guitar  horizontally
  // gltf.scene.scale.z *= -1;

  // left handed guitar
  // gltf.scene.scale.set(-1 * 0.006, 0.006, 0.006)

  console.log(gltf.scene);
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      // id: 24 is the body of the guitar
      if (child.id === 24) {
        // child.material.color.set('#00ff00');
      }
      // console.log(child.id, child.material.color);
    }
  });
  gltf.scene.traverse((child) => {
    if (child.isMesh) {
      child.onClick = () => {
        console.log("Clicked mesh ID:", child.id);
      };
    }
  });
  return (
    <>
      <primitive object={gltf.scene} scale={0.006} />
    </>
  );
}
