import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { withDevCycleProvider } from "@devcycle/react-client-sdk";
import { useVariableValue } from "@devcycle/react-client-sdk";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";

const FanBlades = ({ spin }) => {
  const bladesRef = useRef();
  useFrame(() => {
    if (spin && bladesRef.current) {
      bladesRef.current.rotation.y += 0.1;
    }
  });

  return (
    <group ref={bladesRef}>
      {[0, 120, 240].map((angle, index) => (
        <mesh
          key={index}
          rotation={[0, (angle * Math.PI) / 180, 0]}
          position={[0, 0, 0]}
        >
          <boxGeometry args={[4, 0.2, 0.5]} />
          <meshStandardMaterial color="#FF4500" />
        </mesh>
      ))}
    </group>
  );
};

const CeilingFan = ({ spin }) => {
  return (
    <group>
      <mesh position={[0, 4, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 4, 32]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="silver" />
      </mesh>
      <FanBlades spin={spin} />
    </group>
  );
};

const TV = ({ tvOn }) => {
  return (
    <group>
      {/* TV Frame */}
      <mesh position={[-5, 2, -9]} rotation={[0, 0, 0]}>
        <boxGeometry args={[4, 2.5, 0.1]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* TV Screen */}
      <mesh position={[-5, 2, -8.95]} rotation={[0, 0, 0]}>
        <planeGeometry args={[3.8, 2.3]} />
        <meshStandardMaterial color={tvOn ? "#FFFFFF" : "#000000"} />
      </mesh>
    </group>
  );
};

const Room = ({ spin, lightOn, tvOn }) => {
  return (
    <group>
      <mesh position={[0, -5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#808080" />
      </mesh>
      <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#D3D3D3" />
      </mesh>
      <CeilingFan spin={spin} />
      <TV tvOn={tvOn} />
      {lightOn && (
        <pointLight position={[0, 3.5, 0]} intensity={1.5} castShadow />
      )}
    </group>
  );
};

export default Room;