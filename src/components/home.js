import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { withDevCycleProvider } from "@devcycle/react-client-sdk";
import { useVariableValue } from "@devcycle/react-client-sdk";
import Room from "./room.js";

const Home = () => {

  const [spin, setSpin] = useState(false);
  const [lightOn, setLightOn] = useState(true);
  const [tvOn, setTvOn] = useState(false);

  const shutDown = useVariableValue("shut-down", false);

  const [preSpin, setPreSpin] = useState(false);
  const [preTv, setPreTv] = useState(false);
  const [preLight, setPreLight] = useState(false);

  const toggleSpin = () => {
    if (!shutDown) {
      setSpin((prev) => !prev);
      setPreSpin((prev) => !prev);
    }
  };

  const toggleLight = () => {
    if (!shutDown) {
      setLightOn((prev) => !prev);
      setPreLight((prev) => !prev);
    }
  };

  const toggleTv = () => {
    if (!shutDown) {
      setTvOn((prev) => !prev);
      setPreTv((prev) => !prev);
    }
  };

  useEffect(() => {
    if (shutDown) {
      setSpin(false);
      setLightOn(false);
      setTvOn(false);
    } else {
      setSpin(preSpin);
      setLightOn(preLight);
      setTvOn(preTv);
    }
  }, [shutDown]);

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <Canvas camera={{ position: [0, 2, 15], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <OrbitControls />
        <Room spin={spin} lightOn={lightOn} tvOn={tvOn} />
      </Canvas>
      <div style={{ position: "absolute", top: "20px", left: "20px" }}>
        <div style={{ marginBottom: "10px" }}>
          <label className="switch">
            <input type="checkbox" checked={spin} onChange={toggleSpin} />
            <span className="slider" />
          </label>
          <span style={{ marginLeft: "10px" }}>{spin ? "Fan On" : "Fan Off"}</span>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label className="switch">
            <input type="checkbox" checked={lightOn} onChange={toggleLight} />
            <span className="slider" />
          </label>
          <span style={{ marginLeft: "10px" }}>
            {lightOn ? "Light On" : "Light Off"}
          </span>
        </div>
        <div>
          <label className="switch">
            <input type="checkbox" checked={tvOn} onChange={toggleTv} />
            <span className="slider" />
          </label>
          <span style={{ marginLeft: "10px" }}>{tvOn ? "TV On" : "TV Off"}</span>
        </div>
      </div>
    </div>
  );
};

export default Home