import PropTypes from "prop-types";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState, useRef, useMemo, useCallback } from "react";
import Model from "./model";
import { useEffect } from "react";
import * as THREE from "three";

// Utility function to determine if a color is dark
const isColorDark = (color) => {
    // Handle hex colors
    if (color.startsWith('#')) {
        const r = parseInt(color.slice(1, 3), 16);
        const g = parseInt(color.slice(3, 5), 16);
        const b = parseInt(color.slice(5, 7), 16);
        // Calculate perceived brightness (modern algorithm)
        return (r * 0.299 + g * 0.587 + b * 0.114) < 140;
    }
    // Handle rgb/rgba colors
    if (color.startsWith('rgb')) {
        const values = color.match(/\d+/g);
        if (values && values.length >= 3) {
            const r = parseInt(values[0]);
            const g = parseInt(values[1]);
            const b = parseInt(values[2]);
            return (r * 0.299 + g * 0.587 + b * 0.114) < 140;
        }
    }
    // Default to assuming light color
    return false;
};

// Screenshot capture component to access the gl renderer
function ScreenshotButton({ onScreenshot }) {
    const { gl, scene, camera } = useThree();

    useEffect(() => {
        // Add a method to the window to be called from outside
        window.takeGuitarScreenshot = () => {
            // Force a render at full resolution
            const originalSize = gl.getSize(new THREE.Vector2());
            gl.setSize(originalSize.x, originalSize.y, false);
            gl.render(scene, camera);

            // Get the canvas element and set preserveDrawingBuffer temporarily if needed
            const canvas = gl.domElement;
            const originalPreserveDrawingBuffer = gl.preserveDrawingBuffer;
            gl.preserveDrawingBuffer = true;

            // Render again to make sure we have the latest frame
            gl.render(scene, camera);

            // Create a new canvas with the same dimensions for the screenshot
            const screenshotCanvas = document.createElement('canvas');
            screenshotCanvas.width = canvas.width;
            screenshotCanvas.height = canvas.height;
            const context = screenshotCanvas.getContext('2d');

            // Draw the WebGL canvas onto the screenshot canvas
            context.drawImage(canvas, 0, 0);

            // Get the data URL and call the callback
            const dataURL = screenshotCanvas.toDataURL('image/png');

            // Clean up
            gl.preserveDrawingBuffer = originalPreserveDrawingBuffer;

            if (onScreenshot) {
                onScreenshot(dataURL);
            }

            return dataURL;
        };

        return () => {
            // Clean up when component unmounts
            delete window.takeGuitarScreenshot;
        };
    }, [gl, scene, camera, onScreenshot]);

    return null;
}

ScreenshotButton.propTypes = {
    onScreenshot: PropTypes.func,
};

// Modern UI color schemes
const colorSchemes = {
    dark: {
        text: 'rgba(255, 255, 255, 0.95)',
        secondaryText: 'rgba(220, 220, 220, 0.8)',
        buttonBg: 'rgba(255, 255, 255, 0.15)',
        buttonText: 'rgba(255, 255, 255, 0.95)',
        activeButtonBg: 'rgba(255, 255, 255, 0.25)',
        activeButtonBorder: 'rgba(255, 255, 255, 0.4)'
    },
    light: {
        text: 'rgba(30, 30, 30, 0.95)',
        secondaryText: 'rgba(60, 60, 60, 0.8)',
        buttonBg: 'rgba(0, 0, 0, 0.08)',
        buttonText: 'rgba(30, 30, 30, 0.9)',
        activeButtonBg: 'rgba(0, 0, 0, 0.15)',
        activeButtonBorder: 'rgba(0, 0, 0, 0.3)'
    }
};

// Define camera position presets
const cameraPositions = {
    front: { position: [-5, 0, 5], lookAt: [0, 0, 0] },
    back: { position: [5, 0, -15], lookAt: [0, 0, 0] },
    top: { position: [0, 8, 0], lookAt: [0, 0, 0] },
    headstock: { position: [-5, 20, 15], lookAt: [0, 0, 0] },
    body: { position: [0, 2, 7], lookAt: [0, -2, 0] }
};

function CameraControls({ preset }) {
    const { camera } = useThree();
    const controlsRef = useRef();

    useEffect(() => {
        if (!preset) return;

        // Animate to the new position
        const { position, lookAt } = cameraPositions[preset];

        const startPosition = {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
        };

        const startTime = performance.now();
        const duration = 1000; // 1 second animation

        function animateCamera() {
            const elapsed = performance.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease in-out function for smoother animation
            const easeProgress = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            // Update camera position with interpolation
            camera.position.x = startPosition.x + (position[0] - startPosition.x) * easeProgress;
            camera.position.y = startPosition.y + (position[1] - startPosition.y) * easeProgress;
            camera.position.z = startPosition.z + (position[2] - startPosition.z) * easeProgress;

            // Update the target the camera is looking at
            camera.lookAt(...lookAt);

            // Reset controls target
            if (controlsRef.current) {
                controlsRef.current.target.set(...lookAt);
            }

            // Continue animation if not complete
            if (progress < 1) {
                requestAnimationFrame(animateCamera);
            }
        }

        animateCamera();
    }, [camera, preset]);

    return <OrbitControls ref={controlsRef} minDistance={3} maxDistance={10} />;
}

CameraControls.propTypes = {
    preset: PropTypes.string
};

// Initial camera animation component
function InitialCameraAnimation() {
    const { camera } = useThree();

    useEffect(() => {
        // Set initial position immediately
        camera.position.set(0, 0, 15);
        camera.lookAt(0, 0, 0);

        const startTime = performance.now();
        const targetPosition = cameraPositions.front.position;
        const duration = 2000;

        function animate() {
            const progress = Math.min(1, (performance.now() - startTime) / duration);

            // Ease animation
            const easeProgress = progress < 0.5
                ? 2 * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 2) / 2;

            camera.position.x = 0 + (targetPosition[0] - 0) * easeProgress;
            camera.position.y = 0 + (targetPosition[1] - 0) * easeProgress;
            camera.position.z = 15 + (targetPosition[2] - 15) * easeProgress;

            // Look at the center
            camera.lookAt(...cameraPositions.front.lookAt);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        // Start animation immediately
        requestAnimationFrame(animate);

        // No cleanup needed as this only runs once
    }, [camera]);

    return null;
}

Canvas3D.propTypes = {
    background: PropTypes.string.isRequired,
    guitar: PropTypes.object.isRequired,
    changeGuitarConfig: PropTypes.func.isRequired,
    onScreenshot: PropTypes.func,
};

export default function Canvas3D({ background, guitar, changeGuitarConfig, onScreenshot }) {
    const [cameraPreset, setCameraPreset] = useState(null);
    const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);

    // Determine color scheme based on background color
    const colorScheme = useMemo(() => isColorDark(background) ? colorSchemes.dark : colorSchemes.light, [background]);

    // Set the front view as default after initial animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialAnimationComplete(true);
            setCameraPreset('front');
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    // Screenshot functionality
    const takeScreenshot = useCallback(() => {
        if (window.takeGuitarScreenshot) {
            window.takeGuitarScreenshot();
        }
    }, []);

    // Button styles
    const buttonStyle = {
        background: colorScheme.buttonBg,
        border: 'none',
        borderRadius: '4px',
        color: colorScheme.buttonText,
        padding: '8px 12px',
        margin: '0 5px',
        cursor: 'pointer',
        fontSize: '12px',
        fontWeight: '600',
        backdropFilter: 'blur(5px)',
        transition: 'all 0.2s ease'
    };

    const activeButtonStyle = {
        ...buttonStyle,
        background: colorScheme.activeButtonBg,
        boxShadow: `0 0 0 2px ${colorScheme.activeButtonBorder}`
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <Canvas className="canvas-3d">
                <Suspense fallback={null}>
                    {!initialAnimationComplete && <InitialCameraAnimation />}
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[0, 0, 5]} rotateZ={0} intensity={0.9} />
                    <color attach="background" args={[background]} />
                    <Model guitar={guitar} changeGuitarConfig={changeGuitarConfig} />
                    <CameraControls preset={cameraPreset} />
                    <ScreenshotButton onScreenshot={onScreenshot} />
                </Suspense>
            </Canvas>

            {/* Camera position buttons */}
            <div style={{
                position: 'absolute',
                top: '20px',
                left: '0',
                right: '0',
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                padding: '10px',
                zIndex: 10
            }}>
                <button
                    onClick={() => setCameraPreset('front')}
                    style={cameraPreset === 'front' ? activeButtonStyle : buttonStyle}
                >
                    Front View
                </button>
                <button
                    onClick={() => setCameraPreset('back')}
                    style={cameraPreset === 'back' ? activeButtonStyle : buttonStyle}
                >
                    Back View
                </button>
                <button
                    onClick={() => setCameraPreset('top')}
                    style={cameraPreset === 'top' ? activeButtonStyle : buttonStyle}
                >
                    Top View
                </button>
                <button
                    onClick={() => setCameraPreset('headstock')}
                    style={cameraPreset === 'headstock' ? activeButtonStyle : buttonStyle}
                >
                    Headstock
                </button>
                <button
                    onClick={() => setCameraPreset('body')}
                    style={cameraPreset === 'body' ? activeButtonStyle : buttonStyle}
                >
                    Body
                </button>
                <button
                    onClick={takeScreenshot}
                    className="canvas-3d-screenshot-button"
                    style={{
                        ...buttonStyle,
                        background: 'rgba(46, 204, 113, 0.2)',
                        color: colorScheme.text,
                        fontWeight: '600',
                    }}
                >
                    Take Screenshot
                </button>
            </div>

            {/* Controls overlay with improved legibility */}
            <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '0',
                right: '0',
                color: colorScheme.text,
                padding: '10px',
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
                display: 'flex',
                justifyContent: 'center',
                gap: '30px',
                letterSpacing: '0.5px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '8px', fontWeight: '600', color: colorScheme.text }}>Rotate:</span>
                    <span style={{ fontWeight: '500', color: colorScheme.secondaryText }}>Left click + drag</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '8px', fontWeight: '600', color: colorScheme.text }}>Move:</span>
                    <span style={{ fontWeight: '500', color: colorScheme.secondaryText }}>Right click + drag</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '8px', fontWeight: '600', color: colorScheme.text }}>Scale:</span>
                    <span style={{ fontWeight: '500', color: colorScheme.secondaryText }}>Scroll wheel</span>
                </div>
            </div>
        </div>
    );
}

