import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import {Container, Fab, Typography,TextField,FormControl} from '@mui/material/';



const Boldface =() => {

  const boldfaces = [
    {
      headerText: "Both Engine Flame Out",
      answerText: [
        { answerText1: "IGNITION", answerText2: "BOTH ON" },
      ]
    },
    {
      headerText: "Engine Fire / Severe Damage",
      answerText: [
        { answerText1: "FUEL LEVER", answerText2: "SHUT" },
        { answerText1: "FIRE HANDLE", answerText2: "PULL AND DISCH 1" },
      ]
    },
    {
      headerText: "Engine Out",
      answerText: [
        { promptText: "If no light-up within 10 seconds:", answerText1: "FUEL LEVER", answerText2: "SHUT" },
      ]
    },
    {
      headerText: "Engine ITT High",
      answerText: [
        { answerText1: "POWER LEVER", answerText2: "RETARD" },
      ]
    },
    {
      headerText: "Air-Start",
      answerText: [
        { promptText: "If no light-up within 10 seconds:", answerText1: "FUEL LEVER", answerText2: "SHUT" },
        { answerText1: "START P/B", answerText2: "OFF" },
        { answerText1: "IGNITION", answerText2: "OFF" },
      ]
    },
    {
      headerText: "Excessive Cabin Altitude",
      answerText: [
        { answerText1: "OXY MASK", answerText2: "ON" },
      ]
    },
    {
      headerText: "Evacuation / On Ground",
      answerText: [
        { answerText1: "PARK BRAKE", answerText2: "ON" },
        { answerText1: "BOTH FUEL LEVERS", answerText2: "SHUT" },
      ]
    },
    {
      headerText: "Discountinued Engine Start On Ground",
      answerText: [
        { promptText: "If no light-up within 10 sec after advancing the fuel lever to START:", answerText1: "FUEL LEVER", answerText2: "SHUT" },
        { promptText: "15 sec after shutting the fuel lever:", answerText1: "START P/B", answerText2: "OFF" },
      ]
    },
    {
      headerText: "Discountinued Engine Start On Ground",
      answerText: [
        { promptText: "If ITT rises rapidly and the start limit is likely to be exceeeded:", answerText1: "FUEL LEVER", answerText2: "SHUT" },
        { answerText1: "START P/B", answerText2: "OFF" },
      ]
    },
    {
      headerText: "Ground Range Selectors",
      answerText: [
        { answerText1: "GROUND RANGE SELECTORS", answerText2: "RELEASE" },
        { answerText1: "POWER LEVERS", answerText2: "MOVE FORWARD UNTIL ALERT LIGHT GOES OFF" },
      ]
    },
    {
      headerText: "Jet-Pipe Fire",
      answerText: [
        { answerText1: "FUEL LEVER", answerText2: "SHUT" },
        { answerText1: "FUEL PUMPS", answerText2: "OFF" },
        { answerText1: "START P/B", answerText2: "ON" },
        { answerText1: "ENGINE SELECTOR", answerText2: "L OR R" },
        { promptText: "After fire has been extinguished:", answerText1: "START P/B", answerText2: "OFF"},
      ]
    },
  ]
  
  var defaultValues = {
    name: "",
    age: 0,
    gender: "",
    os: "",
    favoriteNumber: 0,
  };

  const [Questions, setQuestions] = useState(boldfaces);
  const [randomNumber, setRandomNumber] = useState(0)
  const [formValues, setFormValues] = useState(defaultValues)

  const generateRandomNumber = () => {
    const randomNumber = Math.floor(Math.random() * boldfaces.length);
    setRandomNumber(randomNumber)
    console.log()
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
  };

  return (
    <Container maxWidth="xl">
      <form onSubmit={handleSubmit}>
      <FormControl>
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: "90%" },
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="body1">{Questions[randomNumber].headerText}</Typography>
              {Questions[randomNumber].answerText.map((ans) => (
                <>
                <Typography variant="body2">{ans.promptText}</Typography>
                <Box
                  sx={{display: 'flex' }
                  }
                  noValidate
                  autoComplete="off"
                >
                  <TextField name={Object.keys(ans)[1]} id="outlined-basic" label="" variant="outlined" size="small" onChange={handleInputChange}/>
                  <TextField name={Object.keys(ans)[2]} id="outlined-basic" label="" variant="outlined" size="small" onChange={handleInputChange}/>
                </Box>
                </>
              ))}
    </Box>
    <Fab variant="extended" size="medium" onClick={generateRandomNumber} type="submit">
    Submit
    </Fab>
    </FormControl>
    </form>
    </Container>
  );
}

export default Boldface;
