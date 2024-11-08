import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Model from "./model";
import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

function CameraAnimation() {
    const { camera } = useThree();

    useEffect(() => {
        // Set initial position immediately
        camera.position.set(0, 0, 15);
        camera.lookAt(4, 0, -3);

        const startTime = performance.now();
        const targetX = -5; // Changed to move camera to the left
        const targetZ = 5;
        const duration = 3000;

        function animate() {
            const progress = Math.min(1, (performance.now() - startTime) / duration);
            camera.position.z = 15 - (15 - targetZ) * progress;
            camera.position.x = 0 - (0 - targetX) * progress; // Added x-position animation
            // Update camera zoom
            const startZoom = 15;
            const endZoom = 10;
            camera.position.z = startZoom - (startZoom - endZoom) * progress;
            camera.lookAt(0, 0, 0); // Look at the center

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }

        // Start animation immediately
        requestAnimationFrame(animate);

        // Cleanup function
        return () => {
            camera.position.set(-5, 0, 5); // Updated final position
        };
    }, [camera]);

    return null;
}

Canvas3D.propTypes = {
    background: PropTypes.string.isRequired,
    guitar: PropTypes.object.isRequired,
    changeGuitarConfig: PropTypes.func.isRequired,
};

export default function Canvas3D({ background, guitar, changeGuitarConfig }) {
    return (
        <Canvas className="canvas-3d">
            <Suspense fallback={null}>
                <CameraAnimation />
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 0, 5]} rotateZ={0} intensity={0.9} />
                <color attach="background" args={[background]} />
                <Model guitar={guitar} changeGuitarConfig={changeGuitarConfig} />
                <OrbitControls minDistance={3} maxDistance={7} />
                {/* <Environment preset="sunset" background /> */}
            </Suspense>
        </Canvas>


    );
}

