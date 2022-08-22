import React from 'react';
import ResponsiveAppBar from './components/nav'
import Home from './components/Home'
import Overview from './components/Overview'
import Boldface from './components/Boldface'
import Quiz from './components/Quiz'
import { Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Overview" element={<Overview />} />
        <Route path="Boldface" element={<Boldface />} />
        <Route path="Quiz" element={<Quiz />} />
      </Routes>
    </div>
  );
}

export default App;
