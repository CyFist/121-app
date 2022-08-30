import React, { useState, useEffect, useRef  } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { alpha, Box, Container, Stepper, Step, StepLabel, Backdrop, Fab, Typography, TextField } from '@mui/material/';
import { teal, pink, grey } from "@mui/material/colors";
import { isEqual, forIn, update } from "lodash";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

export default function Boldface() {

  const boldfaces = [
    {
      header : "Both Engine Flame Out",
      answers: [
        { answerText1: "IGNITION", answerText2: "BOTH ON" },
      ]
    },
    {
      header: "Engine Fire / Severe Damage",
      answers: [
        { answerText1: "FUEL LEVER", answerText2: "SHUT" },
        { answerText3: "FIRE HANDLE", answerText4: "PULL AND DISCH 1" }
      ]
    },
    {
      header: "Engine Out",
      answers: [
        { answerText1: "FUEL LEVER", answerText2: "SHUT", promptText: "If no light-up within 10 seconds:" }
      ]
    },
    {
      header: "Engine ITT High",
      answers: [
        { answerText1: "POWER LEVER", answerText2: "RETARD" }
      ]
    },
    {
      header: "Air-Start",
      answers: [
        { answerText1: "FUEL LEVER", answerText2: "SHUT", promptText: "If no light-up within 10 seconds:" },
        { answerText3: "START P/B", answerText4: "OFF" },
        { answerText5: "IGNITION", answerText6: "OFF" }
      ]
    },
    {
      header: "Excessive Cabin Altitude",
      answers: [
        { answerText1: "OXY MASK", answerText2: "ON" },
      ]
    },
    {
      header: "Evacuation / On Ground",
      answers: [
        { answerText1: "PARK BRAKE", answerText2: "ON" },
        { answerText3: "BOTH FUEL LEVERS", answerText4: "SHUT" }
      ]
    },
    {
      header: "Discountinued Engine Start On Ground",
      answers: [
        { answerText1: "FUEL LEVER", answerText2: "SHUT", promptText: "If no light-up within 10 sec after advancing the fuel lever to START:" },
        { answerText3: "START P/B", answerText4: "OFF", promptText: "15 sec after shutting the fuel lever:" }
      ]
    },
    {
      header: "Discountinued Engine Start On Ground",
      answers: [
        { answerText1: "FUEL LEVER", answerText2: "SHUT", promptText: "If ITT rises rapidly and the start limit is likely to be exceeeded:" },
        { answerText3: "START P/B", answerText4: "OFF" }
      ]
    },
    {
      header: "Emergency Descent",
      answers: [
        { answerText1: "POWER LEVERS", answerText2: "FLT IDLE" },
        { answerText3: "SPEED", answerText4: "VMO" }
      ]
    },
    {
      header:"Ground Range Selectors",
      answers: [
        { answerText1: "GROUND RANGE SELECTORS", answerText2: "RELEASE" },
        { answerText3: "POWER LEVERS", answerText4: "MOVE FORWARD UNTIL ALERT LIGHT GOES OFF" }
      ]
    },
    {
      header: "Jet-Pipe Fire",
      answers: [
        { answerText1: "FUEL LEVER", answerText2: "SHUT" },
        { answerText3: "FUEL PUMPS", answerText4: "OFF" },
        { answerText5: "START P/B", answerText6: "ON" },
        { answerText7: "ENGINE SELECTOR", answerText8: "L OR R" },
        { answerText9: "START P/B", answerText10: "OFF", promptText: "After fire has been extinguished:" }
      ]
    },
  ]
  
  const defaultValues = {};

  const [Questions, setQuestions] = useState(boldfaces);
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() *(Questions.length-1)))
  const [formValues, setFormValues] = useState(defaultValues)
  const [success, setSuccess] = useState(false);
  const [Openpop, setOpenpop] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const timer = useRef();

  const navigate = useNavigate();

  const { control, handleSubmit, reset } = useForm({
    reValidateMode: "onBlur"
  });

  const bgSx = {...(success && {backgroundColor: alpha(teal[800],0.9),})};

  useEffect(()=>{
    var items = {};

    Questions[randomNumber].answers.forEach(obj => {
      Object.keys(obj).forEach(key => {
        if (key.startsWith('answerText')) {
          items = { ...items, [key]: obj[key]}
        }
      }) 
    });
  setFormValues(items);
  },[])
    
  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleOnSubmit = (evt) => {
    
    forIn(evt, function(value, key) {
      update(evt, key, function(value) { return value.toUpperCase(); })
    });

    //console.log(evt);
    //console.log(formValues);

    if (isEqual(evt, formValues)){
          setActiveStep((prevActiveStep) => prevActiveStep + 1);

          setSuccess(true);
          setOpenpop(true);
        timer.current = window.setTimeout(() => {
          setOpenpop(false);
        }, 800);
        
        timer.current = window.setTimeout(() => {
          setSuccess(false);
        }, 1000);

      if (Questions.length !== 1) {
        Questions.splice(randomNumber,1);
      }else{
        navigate("/")
      }
    }else{
          setSuccess(false);
          setOpenpop(true);
        timer.current = window.setTimeout(() => {
          setOpenpop(false);
          setSuccess(false);
        }, 1000);
    }
    
    //console.log( isEqual(evt, formValues) )
    //console.log(Questions)
    reset()
    
    const rndnum = Math.floor(Math.random() *(Questions.length-1))
    setRandomNumber(rndnum);
    setFormValues(defaultValues)

      Questions[rndnum].answers.forEach(obj => {
        Object.keys(obj).forEach(key => {
          if (key.startsWith('answerText')) {
            setFormValues(prev => ({...prev,[key]: obj[key]}));
          }
        }) 
    });
  };

  return (
    <Container sx={{
      '& .MuiBackdrop-root': { position:"absolute", top:"3.5rem"}}}disableGutters={true} maxWidth="xl">
      <Backdrop
        sx={[{zIndex: (theme) => theme.zIndex.drawer - 1,
          backgroundColor: alpha(pink[900],0.9)}, bgSx]}
        open={Openpop}
      ></Backdrop>
      <Box
        component="form"
        onSubmit={handleSubmit(handleOnSubmit)}
        sx={{
          '& .MuiTextField-root': { m: 1, width: "90%", position:"relative" },
          '& .MuiBackdrop-root': { position:"absolute", "flex-direction": "column" },
          '& .MuiStep-root': {padding:"0", width: "100%"},  
          '& .MuiStepLabel-iconContainer': {padding: "0.2rem"},
          '& .MuiStepLabel-root': {"flex-direction": "column"},
          '& .MuiStepIcon-root.Mui-active': {color: teal[200]},
          '& .MuiStepIcon-root.Mui-completed': {color: teal[400]},
          position: "relative"
        }}
        noValidate
        autoComplete="off"
      >
        <Backdrop
        sx={{zIndex: (theme) => theme.zIndex.drawer - 1,
          backgroundColor: "transparent"}}
        open={Openpop}
      >{success? <CheckCircleOutlinedIcon sx={{fontSize:"6rem"}}/> : <CancelOutlinedIcon sx={{fontSize:"6rem"}}/>}
        <Typography sx={{fontSize:"3rem", backgroundColor:"transparent", color: grey[300]}}>{success? "Correct" : "Incorrect"}</Typography>
      </Backdrop>
      <Stepper
      activeStep={activeStep} connector={false}>        
      {boldfaces.map((index) => {
        const stepProps = {};
        const labelProps = {};
        return (
          <Step {...stepProps}>
            <StepLabel {...labelProps}></StepLabel>
          </Step>
        );
      })}</Stepper>
        <Typography variant="h6">{Questions[randomNumber].header}</Typography>
                {Questions[randomNumber].answers.map(ans => (
                  <>
                  <Typography variant="body2">{ans.promptText}</Typography>
                  <Box
                    sx={{display: 'flex' }
                    }
                    noValidate
                    autoComplete="off"
                  >
                    <Controller
                    control={control}
                    name={Object.keys(ans)[0]}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        variant="outlined"
                        size="small"
                        label=""
                        inputProps={{ style: { fontSize: "0.8rem", textTransform: "uppercase" } }}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name={Object.keys(ans)[1]}
                    defaultValue=""
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        variant="outlined"
                        size="small"
                        label=""
                        inputProps={{ style: { fontSize: "0.8rem", textTransform: "uppercase" } }}
                      />
                )}
              />                  
                  </Box>
                  </>
                ))}
        <Fab sx={{"margin-top":"0.5rem"}}variant="extended" size="medium" type="submit">
          Submit
        </Fab>
        

      </Box>       
    </Container>
  );
};