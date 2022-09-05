import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { restdb }  from "../utils/api_client";
import { alpha, Box, Container, Stepper, Step, StepLabel, Backdrop, Fab, Typography, TextField, Grid } from '@mui/material/';
import { teal, pink, grey } from "@mui/material/colors";
import { isEqual, forIn, update } from "lodash";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import boldfaces from "../utils/boldfaces.json"
import dayjs from 'dayjs'


export default function Boldface({ UserObj, setUserObj, id }) {

  const defaultValues = {};

  const [Questions, setQuestions] = useState(boldfaces);
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() *(Questions.length-1)))
  const [formValues, setFormValues] = useState(defaultValues)
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [Openpop, setOpenpop] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [idx, setIdx] = useState({upd:true,index:0  });
  const timer = useRef();
  const myRefs = useRef([]);
  const objs = useRef([])
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

  useEffect(() => {
    myRefs.current[idx.index].focus();
  }, [idx.index]);

  const putData = async () => {
    setError("");

    const body = {
      "_id": UserObj._id,
      "User": UserObj.User,
      "Date": dayjs().toISOString()
    }

    try {
      await restdb.put(`/records/${UserObj._id}`, body);
      
    } catch (error) {
      setError("Something went wrong!");
      return console.log(error);
    }
};

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
        putData()
        navigate("/Overview")
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

    var i = 0
        var track = 'false'
        var setf = 'false'
      Questions[rndnum].answers.forEach((obj,index) => {
        
          if (Object.keys(obj)[0].startsWith('answerText')) {
              track = 'true'
              if(track == 'true' && setf == 'false'){
                setIdx({...idx,
                  index: index})
                  myRefs.current[index].focus();
                setf = 'true'
              }
            setFormValues(prev => ({...prev,[Object.keys(obj)[0]]: obj[Object.keys(obj)[0]]}));
          }
    });
    
  };
  
  objs.current = Questions[randomNumber].answers.map((ans, index) => {
                    if(Object.keys(ans)[0].startsWith('prompt')){
                      return <>
                            <Grid item xs={12}>
                              <Typography variant="body2">{ans.promptText}</Typography>
                            </Grid>
                          </>
                    }else{
                      return <>
                              <Grid item xs={6}> 
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
                                      multiline
                                      inputProps={{ style: { fontSize: "0.75rem", textTransform: "uppercase" } }}
                                      inputRef={(el) => (myRefs.current[index] = el)}

                                    />
                                  )}
                                />
                              </Grid>
                            </>
                    }
                })

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
          '& .MuiInputBase-root': {padding:"0.3rem 0.5rem"},
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
      <Box sx={{
              display: { md: 'flex' }}}>
      <Stepper
      activeStep={activeStep} connector={false}>        
      {[1,2,3,4,5,6,7,8,9,10,11,12].map((index) => {
        const stepProps = {};
        const labelProps = {};
        return (
          <Step {...stepProps}>
            <StepLabel {...labelProps}></StepLabel>
          </Step>
        );
      })}</Stepper>
      </Box>
        <Typography variant="h6">{Questions[randomNumber].header}</Typography>
          <Grid sx={{padding:"0.3rem"}}container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
            {objs.current}
          </Grid>
        <Fab sx={{"margin-top":"0.5rem"}}variant="extended" size="medium" type="submit">
          Submit
        </Fab>
      </Box>       
    </Container>
  );
};