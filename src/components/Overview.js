import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from '@mui/material/Box';

const Overview =() => {

  const [Data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    const fetchquiz = async () => {
      setLoading(true);
      try {
        const headers = {
        "x-apikey": "63027f8439a0a971fe91626a",
        "cache-control": "no-cache"
      };

      const { data } = await axios.get('https://onetwoone-ca88.restdb.io/rest/quiz', { headers })
        setData(data);
        console.log(Data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchquiz();
    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  const objs = Data.map((obj, index) => {
    return <div key={index}>{obj.Questions}
          <li>{obj.Option1}</li>
          <li>{obj.Option2}</li>
          <li>{obj.Option3}</li>
          <li>{obj.Option4}</li>
    </div>;
  });
  
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
      <h1>Overview</h1>
      <h2>

        </h2>
    </Box>
  );
  }

export default Overview;

