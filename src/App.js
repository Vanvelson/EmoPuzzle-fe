import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/Login"; 
import FirstLevel from "./components/FirstLevel";
import ThirdLevel from "./components/ThirdLevel";
import Module_1_first from './components/module_1_first/module_1_first';
import Module_1_second from "./components/module_1_second/module_1_second";
import Module_1_third from "./components/module_1_third/module_1_third";
import Module_1_fourth from "./components/module_1_fourth/module_1_fourth";
import Scene from "./components/scene";
import Scene_1 from "./components/scene_1";
import Scene_2 from "./components/scene_2";
import Camera from "./components/camera";
import "./App.css"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/firstlevel" element={<FirstLevel />} />
        <Route path="/Thirdlevel" element={<ThirdLevel />} />
        <Route path="/Module_1_first" element={<Module_1_first />} />
        <Route path="/Module_1_second" element={<Module_1_second />} />
        <Route path="/Module_1_third" element={<Module_1_third />} />
        <Route path="/Module_1_fourth" element={<Module_1_fourth />} />
        <Route path="/scene" element={<Scene />} />
        <Route path="/scene_1" element={<Scene_1 />} />
        <Route path="/scene_2" element={<Scene_2 />} />
        <Route path="/camera" element={<Camera />} />
      </Routes>
    </Router>
  );
};

export default App;