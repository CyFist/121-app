import React, { useState, useEffect } from "react";
import restdb  from "../utils/api_client";
import { useNavigate } from "react-router";
import { alpha, Box, Grid, Paper, Typography } from '@mui/material';
import { teal, pink, grey } from "@mui/material/colors";
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(isSameOrAfter)

const Overview = ({ Username, setUsername, Data }) => {

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [Valid, setValid] = useState(false);
  
  const postData = async () => {

    const data = {
      "User": 'XMOS',
      "Date": new Date().toISOString()
    }

    //if ((title, body)) {
      setError("");
      try {
        await restdb.post("/records", data);

      } catch (error) {
        setError("Something went wrong!");
        return console.log(error);
      }
    //}
  };

  function handleOnSubmit(obj) {
    sessionStorage.setItem('User', obj); 
    setUsername(obj);
    if (!dayjs(obj.Date).isSameOrAfter(dayjs().day(1))){
      navigate("/Boldface")
    }
    //console.log(sessionStorage.getItem('User'));
  }

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
        <Grid item xs onClick={() => { handleOnSubmit(obj) }}>
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
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        {objs}
      <Grid item>
        
      <Grid container direction="column" rowSpacing={1}>
        <Grid item>
          <StyledPaper
          sx={{
            height: "2.23rem",
            width: "5rem",
            padding: "0.3rem",
            backgroundColor: grey[700]}}
          >
            <Grid item xs onClick={() => { console.log("clicked")}}>
              <Typography variant="subtitle1">
                Add
              </Typography>
            </Grid>
          </StyledPaper>
        </Grid>
        <Grid item>
          <StyledPaper
            sx={{
              height: "2.23rem",
              width: "5rem",
              padding: "0.3rem",
              backgroundColor: grey[900]}}
          >
            <Grid item xs onClick={() => { console.log("clicked")}}>
              <Typography variant="subtitle1">
                Remove
              </Typography>
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>
      
    </Grid>          
      </Grid>      
    </Box>
    </>
  );
  }

export default Overview;

//      <Button onClick={() => { putData();}}>put data</Button>
//<Button onClick={() => { postData();}}>post data</Button>