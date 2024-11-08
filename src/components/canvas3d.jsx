import PropTypes from "prop-types";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";

Canvas3D.propTypes = {
    background: PropTypes.string.isRequired,
    guitar: PropTypes.object.isRequired,
    changeGuitarConfig: PropTypes.func.isRequired,
};

export default function Canvas3D({ background, guitar, changeGuitarConfig }) {
    return (
        <>
            <Canvas className="canvas-3d">
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[0, 0, 5]} rotateZ={0} intensity={0.9} />
                    <color attach="background" args={[background]} />
                    <Model guitar={guitar} changeGuitarConfig={changeGuitarConfig} />
                    <OrbitControls minDistance={3} maxDistance={7} />
                    {/* <Environment preset="sunset" background /> */}
                </Suspense>
            </Canvas>
        </>
    );
}

Model.propTypes = {
    guitar: PropTypes.object.isRequired,
    changeGuitarConfig: PropTypes.func.isRequired,
}

export function Model({ guitar }) {
    const gltf = useLoader(GLTFLoader, "./guitar.gltf");
    gltf.scene.position.y = -1.5;




    if (guitar.orientationLeft === true) {
        gltf.scene.scale.set(-1 * 0.006, 0.006, 0.006);
    } else {
        gltf.scene.scale.set(0.006, 0.006, 0.006);
    }

    console.log(gltf.scene);
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            // id: 24 is the body of the guitar
            if (child.id === 24) {
                child.material.color.set(guitar.body.color);
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