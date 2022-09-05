import React, { useState, useEffect } from 'react';
import ResponsiveAppBar from './components/nav'
import Home from './components/Home'
import Overview from './components/Overview'
import Boldface from './components/Boldface'
import Quiz from './components/Quiz'
import { restdb, realtimeURL }  from "./utils/api_client";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './App.css';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

let eventSource = new EventSource(realtimeURL);

var ping = new Date()

setInterval(() => {
  let now = new Date().getTime();
  let diff = (now - ping.getTime()) / 1000;
  
  // haven't heard from the server in 20 secs?
  if (diff > 20) {
    // hard reload of client
    window.location.reload();
  }
}, 10000);

eventSource.addEventListener('ping', function(e) {
  ping = new Date(e.data);

}, false);

function App() {

  const [UserObj, setUserObj] = useState([]);
  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  eventSource.addEventListener('put', event => {
    console.log(event)
    //alert(`put ${JSON.parse(event.data).idlist}`);
    getData();
  }, false);

  useEffect(() => {
    //setData([]);
    setData(JSON.parse(localStorage.getItem('records')));
    // GET request using axios inside useEffect React hook
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await restdb.get('/records')
      console.log(data)
      localStorage.setItem('records', JSON.stringify(data));
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
        <ResponsiveAppBar Username={UserObj} setUsername={setUserObj} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Overview" element={<Overview UserObj={UserObj} setUserObj={setUserObj} Data={Data} />} />
          <Route path="Boldface" element={<Boldface UserObj={UserObj} setUserObj={setUserObj} />} />
          <Route path="Quiz" element={<Quiz />} />
        </Routes>
    </ThemeProvider> 
    </div>
  );
}

export default App;
