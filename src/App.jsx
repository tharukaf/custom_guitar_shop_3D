import { useState } from "react";
import Canvas3D from "./components/canvas3d";
import "./App.css";
import Container from "@mui/material/Container";
import BackgroundColorButtons from "./components/backgroundColorButtonGroup";
import { initGuitarConfig } from "./util/initGuitar.mjs";
import { Typography, Button, IconButton } from "@mui/material";
import Customizers from "./components/customizer";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

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

  const handleScreenshot = (dataURL) => {
    // Create a download link
    const link = document.createElement('a');
    link.download = `custom-guitar-${new Date().toISOString().slice(0, 10)}.png`;
    link.href = dataURL;
    link.click();
  };

  return (
    <div className="App" style={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <header id="header">
        <div style={{ width: "40px" }}></div> {/* Spacer to balance the layout */}
        <Typography variant="h3" sx={{
          fontFamily: "Pacifico",
          textAlign: "center",
          flex: 1,
        }}>Custom Guitar Shop</Typography>

        <IconButton
          aria-label="Save guitar image"
          sx={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.3)',
            }
          }}
          onClick={() => {
            // Call the global screenshot function
            if (window.takeGuitarScreenshot) {
              window.takeGuitarScreenshot();
            }
          }}
        >
          <PhotoCameraIcon />
        </IconButton>
      </header>
      <div className="main-grid" style={{ overflow: "hidden", flex: 1 }}>
        <div style={{ height: "100%", overflow: "hidden" }}>
          <Canvas3D
            background={background}
            guitar={guitar}
            changeGuitarConfig={changeGuitarConfig}
            onScreenshot={handleScreenshot}
          />
        </div>
        <div className="customizerSectionContainer" style={{ height: "100%", overflow: "hidden" }}>
          <Container className="customizerSection" sx={{ maxHeight: "100%", overflow: "hidden" }}>
            <BackgroundColorButtons changeBackground={changeBackground} />
            <Customizers changeGuitarConfig={changeGuitarConfig} guitar={guitar} handleChangeOrientation={handleChangeOrientation} />
          </Container>
        </div>
      </div>
      <footer style={{
        padding: "8px 16px",
        backgroundColor: "rgba(0, 0, 0, 0.05)",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        borderTop: "1px solid rgba(0, 0, 0, 0.1)"
      }}>
        <Typography variant="caption" sx={{
          color: "#555",
          fontWeight: 400,
          fontSize: "0.7rem"
        }}>
          © {new Date().getFullYear()} Tharuka Fernando. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
}



