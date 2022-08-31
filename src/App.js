import React from 'react';
import ResponsiveAppBar from './components/nav'
import Home from './components/Home'
import Overview from './components/Overview'
import Boldface from './components/Boldface'
import Quiz from './components/Quiz'
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  var Username = sessionStorage.getItem('User')

  return (
    <div className="App">
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ResponsiveAppBar User={Username} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Overview" element={<Overview />} />
        <Route path="Boldface" element={<Boldface />} />
        <Route path="Quiz" element={<Quiz />} />
      </Routes>
    </ThemeProvider> 
    </div>
  );
}

export default App;
