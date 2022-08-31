import React, { useState, useEffect } from "react";
import axios from "../utils/api.client";
import { alpha, Box, Grid, Paper, Button, Typography } from '@mui/material';
import { teal, pink, grey } from "@mui/material/colors";
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(isSameOrAfter)

const Overview =() => {

  const [Data, setData] = useState([]);
  const [Valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // GET request using axios inside useEffect React hook
    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get('/records')
        sessionStorage.setItem('records', JSON.stringify(data));
        setData(data);
        const test = sessionStorage.getItem('records');
        const test2 = JSON.parse(test);
        console.log(test);
        console.log(test2);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getData();
  }, []);

  const putData = async () => {
    //if ((title, body)) {
      setLoading(true);
      setError("");

      const id = '630e6ba370a5204f00014f6c'

      const data = {
        "_id": id,
        "User": 'XMOS',
        "Date": dayjs('2022-08-27').toISOString()
      }

      try {
        await axios.put(`/records/${id}`, data);
        
      } catch (error) {
        setLoading(false);
        setError("Something went wrong!");
        return console.log(error);
      }
    //}
    setError("Title and Body fields can't be empty!");
  };

  const postData = async () => {

    const data = {
      "User": 'XMOS',
      "Date": new Date().toISOString()
    }

    //if ((title, body)) {
      setLoading(true);
      setError("");
      try {
        await axios.post("/records", data);

      } catch (error) {
        setLoading(false);
        setError("Something went wrong!");
        return console.log(error);
      }
    //}
  };

  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    textAlign: 'center',
    color: theme.palette.text.primary,
  }));

  const objs = Data.map((obj, idx) => {

    var bgclr = alpha(pink[900],0.9)

    if (dayjs(obj.Date).isSameOrAfter(dayjs().day(1))){
      bgclr = alpha(teal[800],0.9)
    }


    return <Grid key={idx} item>
      <StyledPaper
        sx={{
          height: "5rem",
          width: "5rem",
          padding: "0",
          backgroundColor: `${bgclr}`}}
      >
        <Grid item xs onClick={() => { sessionStorage.setItem('User', obj.User); console.log(sessionStorage.getItem('User'));}}>
          <Typography gutterBottom variant="subtitle1">
            {obj.User}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {dayjs(obj.Date).format('DD MMM YY')} 
            {dayjs(obj.Date).isSameOrAfter(dayjs().day(1))}
          </Typography>
        </Grid>
      </StyledPaper>
    </Grid>
  });

  return (
    <>
    <Box sx={{ flexGrow: 1, "padding":"1rem", display: { xs: 'flex', md: 'flex' } }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {objs}
      <Grid item>
      <StyledPaper
        sx={{
          height: "5rem",
          width: "5rem",
          padding: "0.45rem",
          backgroundColor: 'grey'}}
      >
        <Grid item xs onClick={() => { console.log("clicked")}}>
          <Typography gutterBottom variant="subtitle1">
            Add New User
          </Typography>
        </Grid>
      </StyledPaper>
    </Grid>          
      </Grid>      
    </Box>
    </>
  );
  }

export default Overview;

//      <Button onClick={() => { putData();}}>put data</Button>
//<Button onClick={() => { postData();}}>post data</Button>