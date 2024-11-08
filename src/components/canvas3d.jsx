import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

Canvas3D.propTypes = {
    background: PropTypes.string.isRequired,
};

export default function Canvas3D({ background }) {
    return (
        <>
            <Canvas className="canvas-3d">
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[0, 0, 5]} rotateZ={0} intensity={0.9} />
                    <color attach="background" args={[background]} />
                    <Model />
                    <OrbitControls minDistance={3} maxDistance={7} />
                    {/* <Environment preset="sunset" background /> */}
                </Suspense>
            </Canvas>
        </>
    );
}
