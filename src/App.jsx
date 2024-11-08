import { useState } from "react";
import Canvas3D from "./components/canvas3d";
import "./App.css";
import Container from "@mui/material/Container";
import BackgroundColorButtons from "./components/backgroundColorButtonGroup";
import { initGuitarConfig } from "./util/initGuitar.mjs";
import { Typography } from "@mui/material";
import Customizers from "./components/customizer";

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
      <header id="header">

        <Typography variant="h3" sx={{

          fontFamily: "Pacifico",
          textAlign: "center",


        }}>Custom Guitar Shop</Typography>
      </header>
      <div className="main-grid">
        <Canvas3D
          background={background}
          guitar={guitar}
          changeGuitarConfig={changeGuitarConfig}
        />
        <div className="customizerSectionContainer">
          <Container className="customizerSection">
            <BackgroundColorButtons changeBackground={changeBackground} />
            <Customizers changeGuitarConfig={changeGuitarConfig} guitar={guitar} handleChangeOrientation={handleChangeOrientation} />
          </Container>
        </div>
      </div>
    </div >
  );
}



