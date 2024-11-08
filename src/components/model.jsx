import { useLoader } from "@react-three/fiber";
import PropTypes from 'prop-types';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

Model.propTypes = {
    guitar: PropTypes.object.isRequired,
    changeGuitarConfig: PropTypes.func.isRequired,
}

export default function Model({ guitar }) {
    const gltf = useLoader(GLTFLoader, "./guitar.gltf");
    gltf.scene.position.y = -1.5;

    if (guitar.orientationLeft === true) {
        gltf.scene.scale.set(-1 * 0.006, 0.006, 0.006);
    } else {
        gltf.scene.scale.set(0.006, 0.006, 0.006);
    }

    // 25 is knobs
    // 44 is head
    // 26 is neck
    // 24 is body
    // 28 is bracket around pickups
    // 29 is pickups
    // 30 is hardware
    // 39 is graphics on neck
    // 40 is body binding

    console.log(gltf.scene);
    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            console.log(child.id, child.material.color);
            // id: 24 is the body of the guitar
            if (child.id === 24) {
                child.material.color.set(guitar.body.color);
            }
            // id: 25 is the neck of the guitar
            if (child.id === 26) {
                child.material.color.set(guitar.neck.color);
            }
            // id: 44 is the head of the guitar
            if (child.id === 44) {
                // console.log("head", child.material.color);
                child.material.color.set(guitar.headstock.color);
            }
            // id: 28 & 29 is the pickups of the guitar
            if (child.id === 29) {
                child.material.color.set(guitar.pickups.color);
            }
            // id: 25 is the knobs of the guitar
            if (child.id === 25) {
                child.material.color.set(guitar.knobs.color);
            }
            // id: 30 are the hardware of the guitar
            if (child.id === 30 || child.id === 28) {
                child.material.color.set(guitar.hardware.color);
            }
            // id: 39 is the graphics on the neck of the guitar
            if (child.id === 39) {
                child.material.color.set(guitar.graphics.color);
            }
            // id: 40 is the binding on the body of the guitar
            if (child.id === 40) {
                child.material.color.set(guitar.binding.color);
            }
        }
    });
    return (
        <>
            <primitive object={gltf.scene} scale={0.006} />
        </>
    );
}