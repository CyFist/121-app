import React, { useState, useEffect } from 'react';
import ResponsiveAppBar from './components/nav'
import Home from './components/Home'
import Overview from './components/Overview'
import Boldface from './components/Boldface'
import Quiz from './components/Quiz'
import restdb from "./utils/api_client";
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

  const [Username, setUsername] = useState([]);
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await restdb.get('/records')
        sessionStorage.setItem('records', JSON.stringify(data));
        setData(data);
        const test = sessionStorage.getItem('records');
        const test2 = JSON.parse(test);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getData();
  }, []);

  return (
    <div className="App">
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <ResponsiveAppBar Username={Username} setUsername={setUsername} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Overview" element={<Overview Username={Username} setUsername={setUsername} Data={Data} />} />
          <Route path="Boldface" element={<Boldface Username={Username} setUsername={setUsername} />} />
          <Route path="Quiz" element={<Quiz />} />
        </Routes>
    </ThemeProvider> 
    </div>
  );
}

export default App;
