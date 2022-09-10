import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router";
import { restdb }  from "../utils/api_client";
import { alpha, Box, Container, Stepper, Step, StepLabel, Backdrop, Fab, Typography, TextField, Grid } from '@mui/material/';
import { teal, pink, grey } from "@mui/material/colors";
import { isEqual, forIn, update, find, findLast } from "lodash";
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
  const [idx, setIdx] = useState(0);
  const [Txtvalue, setTxtvalue] = useState("");
  const [Counter, setCounter] = useState(0);
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
    const filt_Refs = myRefs.current.filter(element => {
      return element !== null;
    });
    
    filt_Refs[0].focus()

  }, [Counter]);

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

function getLines(str) {
  // This uses RegEx to match new lines.
  // We use || [] because it would otherwise fail if there weren't
  // any line breaks yet.

  return (str.match(/[\r\n]/g) || []).length;
}

  const handleOnInput = (e,idx) => {

    var newValue = e.target.value;
    var newLines = getLines(newValue);

    //console.log(Txtvalue)
    //console.log(newValue)
    const current_Ref = find(myRefs.current, element => {
      return element !== null;
    }, idx);

    const next_Ref = find(myRefs.current, element => {
      return element !== null;
    }, ++idx);
    
    const last_Ref = findLast(myRefs.current, element => {
      return element !== null;
    });

    if (newLines > 0 ) {
      if(current_Ref===last_Ref){
        handleSubmit(handleOnSubmit)()                                        
      }else{
        //console.log(next_Ref)
        current_Ref.value = newValue.replace(/(\r\n|\n|\r)/gm, "");
        next_Ref.focus()
      }    
      
    }    

  };

  const handleOnKeyPress = (ev,idx) => {
    setTxtvalue(ev.target.value)
  }

  const handleOnSubmit = (evt) => {
    
    setCounter(Counter + 1) //track submission of form to trigger setfocus

    forIn(evt, function(value, key) {
      update(evt, key, function(value) { return value.toUpperCase(); })
    });

    console.log(evt)

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

    reset()

    const rndnum = Math.floor(Math.random() *(Questions.length-1))
    setRandomNumber(rndnum);
    setFormValues(defaultValues)

        var track = 'false'
        var setf = 'false'
      Questions[rndnum].answers.forEach((obj,index) => {
        
          if (Object.keys(obj)[0].startsWith('answerText')) {
              track = 'true'
              if(track === 'true' && setf === 'false'){
                setIdx({...idx,
                  index: index})
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
                                      sx={{'& .MuiOutlinedInput-root': {
                                        '&:hover fieldset': {
                                          borderColor: alpha(teal['A400'],0.9),
                                        },
                                        '&.Mui-focused fieldset': {
                                          borderColor: alpha(teal['A400'],0.9),
                                          backgroundColor: alpha(grey[100],0.2),
                                        },}}} 
                                      {...field}
                                      onKeyPress={(ev) => {
                                        //console.log(`Pressed keyCode ${ev.key}`);
                                        handleOnKeyPress(ev,index)
                                      }}
                                      onInput={(ev) => {handleOnInput(ev,index)}}
                                      fullWidth
                                      id={Object.keys(ans)[0]}
                                      variant="outlined"
                                      size="small"
                                      label=""
                                      multiline
                                      inputProps={{ style: { fontSize: "0.75rem", textTransform: "uppercase" },
                                                    
                                      }}
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
      '& .MuiBackdrop-root': { position:"absolute", top:"3.5rem"}}} disableGutters={true} maxWidth="xl">
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