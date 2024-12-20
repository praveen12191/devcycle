import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { withDevCycleProvider } from "@devcycle/react-client-sdk";
import { useVariableValue } from "@devcycle/react-client-sdk";
import Room from "./room.js";
import axios from 'axios';
import Button from '@mui/material/Button';

const Home = () => {

  const [spin, setSpin] = useState(false);
  const [lightOn, setLightOn] = useState(false);
  const [tvOn, setTvOn] = useState(false);

  const shutDown = useVariableValue("shut-down", true);
  console.log(shutDown);

  const [preSpin, setPreSpin] = useState(false);
  const [preTv, setPreTv] = useState(false);
  const [preLight, setPreLight] = useState(false);

  const [mainSwitch, setSwitch] = useState(true);

  const toggleSpin = () => {
    if (shutDown) {
      setSpin((prev) => !prev);
      setPreSpin((prev) => !prev);
    }
  };

  const toggleLight = () => {
    if (shutDown) {
      setLightOn((prev) => !prev);
      setPreLight((prev) => !prev);
    }
  };

  const toggleTv = () => {
    if (shutDown) {
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
      setSpin(false);
      setLightOn(false);
      setTvOn(false);
    }
  }, [shutDown]);

  const buttonClick = () => {
    setSwitch(!mainSwitch);
    let url = process.env.REACT_APP_SERVER
    console.log(url,'CLICKED');
    axios
      .post(url, {
        flag: mainSwitch,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={{ height: "100vh", position: "relative" }}>
      <Canvas camera={{ position: [0, 2, 15], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <OrbitControls />
        <Room spin={spin} lightOn={lightOn} tvOn={tvOn} />
      </Canvas>
      <div style={{ position: "absolute", top: "20px", left: "20px", zIndex: 1 }}>
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

      {/* Main Switch centered vertically on the right side with custom button style */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "20px",
          display: "flex",
          alignItems: "center",
          zIndex: 1,
          transform: "translateY(-50%)",
        }}
      >
        <Button
          variant="contained"
          onClick={buttonClick}
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            padding: "15px 30px",
            backgroundColor: mainSwitch ?  "#4caf50":"#f44336",
            color: "white",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.3s ease",
          }}
        >
          {mainSwitch ? "Main on": "Main Off" }
        </Button>
      </div>
    </div>
  );
};

export default withDevCycleProvider({
  sdkKey: process.env.REACT_APP_DVC_SDK_KEY,
})(Home);
