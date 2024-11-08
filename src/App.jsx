

import { useState } from "react";
import Canvas3D from "./components/canvas3d";
import "./App.css";
import Container from "@mui/material/Container";
import BackgroundColorButtons from "./components/backgroundColorButtonGroup";
import { initGuitarConfig } from "./util/initGuitar.mjs";
import GlassmorphicSection from "./components/glassmorphicSection";
import Switch from '@mui/material/Switch';
import { Typography, Button } from "@mui/material";


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
              <div>
                {["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#FF33A1", "#33FFF5", "#F5FF33", "#FF8C33", "#8C33FF", "#33FF8C"].map((color) => (
                  <Button
                    key={color}
                    style={{ backgroundColor: color, width: "10px", height: "30px", margin: "5px", border: "none", cursor: "pointer" }}
                    onClick={() => changeGuitarConfig({ body: { color: color } })}
                  />
                ))}
                <input type="color" value={guitar.bodyColor} onChange={(e) => changeGuitarConfig({ body: { color: e.target.value } })} />

              </div>
            </GlassmorphicSection>
            <GlassmorphicSection title="Neck Material">
              <div>
                {[{
                  name: "Ebony",
                  color: "#141313",
                }, {
                  name: "Maple",
                  color: "#d4ad72",
                }, {
                  name: "Rosewood",
                  color: "#311216",
                }].map((wood) => (
                  <button
                    key={wood.color}
                    style={{ margin: "5px", padding: "10px", cursor: "pointer" }}
                    onClick={() => changeGuitarConfig({ neck: { color: wood.color } })}
                  >
                    {wood.name}
                  </button>
                ))}
              </div>
            </GlassmorphicSection>
            <GlassmorphicSection title="Headstock Color">
              <div>
                {["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#FF33A1", "#33FFF5", "#F5FF33", "#FF8C33", "#8C33FF", "#33FF8C"].map((color) => (
                  <Button
                    key={color}
                    style={{ backgroundColor: color, width: "10px", height: "30px", margin: "5px", border: "none", cursor: "pointer" }}
                    onClick={() => changeGuitarConfig({ headstock: { color: color } })}
                  />
                ))}
                <label htmlFor="headstockColor">Custom Color</label>
                <input id="headstockColor" type="color" value={guitar.headstockColor} onChange={(e) => changeGuitarConfig({ headstock: { color: e.target.value } })} />
              </div>
            </GlassmorphicSection>
            <GlassmorphicSection title="Pickup Cover Material">
              <div>
                {[{
                  name: "Black",
                  color: "black",
                }, {
                  name: "Silver",
                  color: "silver",
                }, {
                  name: "Gold",
                  color: "gold",
                }].map((material) => (
                  <Button
                    key={material.color}
                    style={{ backgroundColor: material.color, width: "30px", height: "30px", margin: "5px", border: "none", cursor: "pointer" }}
                    onClick={() => changeGuitarConfig({ pickups: { color: material.color } })}
                  />
                ))}
              </div>
            </GlassmorphicSection>
            <GlassmorphicSection title="Hardware Material">
              <div>
                {[{
                  name: "Black",
                  color: "#141313",
                }, {
                  name: "Silver",
                  color: "silver",
                }, {
                  name: "Gold",
                  color: "gold",
                }].map((material) => (
                  <Button
                    key={material.color}
                    style={{ backgroundColor: material.color, width: "30px", height: "30px", margin: "5px", border: "none", cursor: "pointer" }}
                    onClick={() => changeGuitarConfig({ hardware: { color: material.color } })}
                  />
                ))}
              </div>
            </GlassmorphicSection>
            <GlassmorphicSection title="Neck Inlay Color">
              <div>
                {[{
                  name: "Black",
                  color: "black",
                }, {
                  name: "Silver",
                  color: "silver",
                }, {
                  name: "White",
                  color: "White",
                }, {
                  name: "Gold",
                  color: "gold",
                }].map((material) => (
                  <Button
                    key={material.color}
                    style={{ backgroundColor: material.color, width: "30px", height: "30px", margin: "5px", border: "none", cursor: "pointer" }}
                    onClick={() => changeGuitarConfig({ graphics: { color: material.color } })}
                  />
                ))}
                <input type="color" value={guitar.graphicsColor} onChange={(e) => changeGuitarConfig({ graphics: { color: e.target.value } })} />
              </div>
            </GlassmorphicSection>
            <GlassmorphicSection title="Binding Color">


              {[{
                name: "Black",
                color: "black",
              }, {
                name: "Silver",
                color: "silver",
              }, {
                name: "White",
                color: "White",
              }, {
                name: "Gold",
                color: "gold",
              }].map((material) => (
                <Button
                  key={material.color}
                  style={{ backgroundColor: material.color, width: "30px", height: "30px", margin: "5px", border: "none", cursor: "pointer" }}
                  onClick={() => changeGuitarConfig({ binding: { color: material.color } })}
                />
              ))}
            </GlassmorphicSection>
          </Container>
        </div>
      </div>
    </div>
  );
}




