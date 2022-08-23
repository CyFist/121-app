import React, { useState, useEffect } from "react";
import axios from "../Utils/api.client";
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
        const { data } = await axios.get("/quiz");
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
    </Box>
  );
  }

export default Overview;

//<h2>
//       {objs}
//      </h2>