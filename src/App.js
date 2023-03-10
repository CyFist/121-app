import React, { useState, useEffect } from 'react';
import ResponsiveAppBar from './components/NavBar'
import Home from './pages/Home'
import Overview from './pages/Overview'
import Boldface from './pages/Boldface'
import Quiz from './pages/Quiz'
import WxRadar from './pages/WxRadar';
import { restdb, realtimeURL }  from "./utils/api_client";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

import axios from "axios";
import _ from "lodash";

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
  const [QuizQns, setQuizQns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    eventSource.addEventListener('put', event => {
      //console.log('getdata')
      getData();
    }, false);
    
    eventSource.addEventListener('post', event => {
      //console.log('getdata')
      getData();
    }, false);
  
    eventSource.addEventListener('delete', event => {
      //console.log('getdata')
      getData();
    }, false);

    setData(JSON.parse(localStorage.getItem('records')));
    // GET request using axios inside useEffect React hook
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    try {
      const { data } = await restdb.get('/records?q={}&h={"$orderby": {"Date": -1, "User": 1 }}')
      //console.log(data)
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
          <Route path="Overview" element={<Overview UserObj={UserObj} setUserObj={setUserObj} Data={Data} setData={setData}/>} />
          <Route path="Boldface" element={<Boldface UserObj={UserObj} setUserObj={setUserObj} Data={Data} setData={setData}/>} />
          <Route path="Quiz" element={<Quiz />} />
          <Route path="WxRadar" element={<WxRadar />} />
        </Routes>
    </ThemeProvider> 
    </div>
  );
}

export default App;
