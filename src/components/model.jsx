import { useLoader } from "@react-three/fiber";
import PropTypes from 'prop-types';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import React from 'react'
import { useGLTF } from '@react-three/drei'

Model.propTypes = {
    guitar: PropTypes.object.isRequired,
}

export default function Model(props) {
    const { nodes, materials } = useGLTF('/guitar.gltf')

    // materials['17800'].color = guitar.body.color;
    let guitar = props.guitar;
    let modelScale = 0.0063;
    return (
        // generated with https://github.com/pmndrs/gltfjsx
        <group {...props} dispose={null}>
            <group rotation={[-Math.PI / 2, 0, 0]} scale={
                guitar.orientationLeft
                    ? [-1 * modelScale, modelScale, modelScale]
                    : modelScale} position={[0, -1.5, 0]}>
                <mesh geometry={nodes.Object_2.geometry} material={materials['17800']} material-color={guitar.body.color} />
                <mesh geometry={nodes.Object_3.geometry} material={materials['236241239']} material-color={guitar.knobs.color} />
                <mesh geometry={nodes.Object_4.geometry} material={materials['24011441']} material-color={guitar.neck.color} />
                <mesh geometry={nodes.Object_5.geometry} material={materials['245245245']} />
                <mesh geometry={nodes.Object_6.geometry} material={materials.material} material-color={guitar.hardware.color} />
                <mesh geometry={nodes.Object_7.geometry} material={materials['000_1']} material-color={guitar.pickups.color} />
                <mesh geometry={nodes.Object_8.geometry} material={materials['190188186']} />
                <mesh geometry={nodes.Object_9.geometry} material={materials['190188186']} />
                <mesh geometry={nodes.Object_10.geometry} material={materials['190188186']} material-color={guitar.hardware.color} />
                <mesh geometry={nodes.Object_11.geometry} material={materials['190188186']} />
                <mesh geometry={nodes.Object_12.geometry} material={materials['190188186']} material-color={guitar.hardware.color} />
                <mesh geometry={nodes.Object_13.geometry} material={materials['190188186']} />
                <mesh geometry={nodes.Object_14.geometry} material={materials['190188186']} />
                <mesh geometry={nodes.Object_15.geometry} material={materials['190188186']} />
                <mesh geometry={nodes.Object_16.geometry} material={materials['191191191']} />
                <mesh geometry={nodes.Object_17.geometry} material={materials['231214172']} material-color={guitar.graphics.color} />
                <mesh geometry={nodes.Object_18.geometry} material={materials['237207181']} material-color={guitar.binding.color} />
                <mesh geometry={nodes.Object_19.geometry} material={materials['255128191']} />
                <mesh geometry={nodes.Object_20.geometry} material={materials['255255255']} />
                <mesh geometry={nodes.Object_21.geometry} material={materials['255255255']} />
                <mesh geometry={nodes.Object_22.geometry} material={materials.material_12} material-color={guitar.headstock.color} />
                <mesh geometry={nodes.Object_23.geometry} material={materials['555_1']} />
            </group>
        </group>
    )
}

useGLTF.preload('/guitar.gltf')