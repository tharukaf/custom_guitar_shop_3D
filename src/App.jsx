

import { useState } from "react";
import Canvas3D from "./components/canvas3d";
import "./App.css";
import Container from "@mui/material/Container";
import BackgroundColorButtons from "./components/backgroundColorButtonGroup";
import { initGuitarConfig } from "./util/initGuitar.mjs";
import GlassmorphicSection from "./components/glassmorphicSection";
import Switch from '@mui/material/Switch';
import { Typography } from "@mui/material";


export default function App() {
  const [background, setBackground] = useState("white");
  const [guitar, setGuitar] = useState(initGuitarConfig);

  function changeBackground(color) {
    setBackground(color);
  }
  function changeGuitarConfig(config) {
    setGuitar(prev => {
      return { ...prev, ...config };
    });
  }
  const handleChangeOrientation = (event) => {
    setGuitar({ ...guitar, orientationLeft: event.target.checked });
  };

  const handleGuitarBodyColorChange = (color) => {
    setGuitar({ ...guitar, body: { color: color } });
  }

  return (
    <div className="App" style={{ height: "100%" }}>
      <header
        id="header"
      >
        <Typography variant="h3">Custom Guitar Builder</Typography>
      </header>
      <div className="main-grid">
        <Canvas3D background={background}
          guitar={guitar}
          changeGuitarConfig={changeGuitarConfig}
        />
        <div className="customizerSectionContainer">
          <Container className="customizerSection">
            <BackgroundColorButtons changeBackground={changeBackground} />
            <GlassmorphicSection title="Orientation">
              <div>
                <Typography>{guitar.orientationLeft === true ? "Left Handed" : "Right Handed"}</Typography>
                <Switch
                  checked={guitar.orientationLeft}
                  onChange={handleChangeOrientation}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </div>
            </GlassmorphicSection>
            <GlassmorphicSection title="Body Color">
              <div className="color-picker">
                {["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#FF33A1", "#33FFF5", "#F5FF33", "#FF8C33", "#8C33FF", "#33FF8C"].map((color) => (
                  <button
                    key={color}
                    style={{ backgroundColor: color, width: "10px", height: "30px", margin: "5px", border: "none", cursor: "pointer" }}
                    onClick={() => changeGuitarConfig({ body: { color: color } })}
                  />
                ))}
                <input type="color" value={guitar.bodyColor} onChange={(e) => changeGuitarConfig({ body: { color: e.target.value } })} />

              </div>
            </GlassmorphicSection>
            <GlassmorphicSection title="Neck Material">
              this is a glassmorphic section
            </GlassmorphicSection>
            <GlassmorphicSection title="Headstock Color">
              this is a glassmorphic section
            </GlassmorphicSection>
            <GlassmorphicSection title="Pickup Cover Material">
              this is a glassmorphic section
            </GlassmorphicSection>
            <GlassmorphicSection title="Pickup Cover Material">
              this is a glassmorphic section
            </GlassmorphicSection>
            <GlassmorphicSection title="Pickup Cover Material">
              this is a glassmorphic section
            </GlassmorphicSection>
          </Container>
        </div>
      </div>
    </div>
  );
}




