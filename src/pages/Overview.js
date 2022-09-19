import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { restdb } from "../utils/api_client";
import { useNavigate } from "react-router";
import { alpha, Box, Grid, Button, Typography, TextField, Backdrop, Fade, Container } from '@mui/material';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import CircularProgress from '@mui/material/CircularProgress';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { teal, pink, grey } from "@mui/material/colors";
import { styled } from '@mui/material/styles';
import { filter, orderBy, startsWith, reject} from "lodash";
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isBetween from 'dayjs/plugin/isBetween'
import isoWeek from 'dayjs/plugin/isoWeek'
import localeData from 'dayjs/plugin/localeData'
dayjs.extend(localeData)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)
dayjs.extend(isoWeek)

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
};

const Overview = ({ UserObj, setUserObj, Data, setData }) => {

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [Valid, setValid] = useState(false);
  const [open, setOpen] = useState(false);
  const [ModalTitle, setModalTitle] = useState("");
  const [labelText, setLabelText] = useState("User");
  const [q, setQ] = useState("");
  const [errorText, setErrorText] = useState();
  const [AddbtnDisabled, setAddbtnDisabled] = useState(true);
  const [RembtnDisabled, setRembtnDisabled] = useState(true);
  const myRefs = useRef([]);
  const textfieldref = useRef()
  const timerRef = useRef();
  const [value, setValue] = useState();
  
  const { control, handleSubmit, reset } = useForm({
    reValidateMode: "onBlur"
  });

  const [status, setStatus] = useState('idle');
  const [bdopen, setbdOpen] = useState(false);

  const SearchUser = (event) => {
    setQ(event.searchfield) 
  };

  const AddonChange = (ev) => {
    setValue(ev.target.value.toUpperCase());

    const UserData = filter(Data, ['User', ev.target.value.toUpperCase()])

    if (ev.target.value === ''){
      setAddbtnDisabled(true)
    }else{
      if (UserData.length===0) {
        setAddbtnDisabled(false)
        setLabelText("User");
        setErrorText("");
      } else {
        setAddbtnDisabled(true)
        setErrorText("User in System");
        setLabelText("User in System");
      }
    }
  };

  const RemoveonChange = (ev) => {
    setValue(ev.target.value.toUpperCase());
    if (ev.target.value.toUpperCase() === ''){
      setRembtnDisabled(true)
    }else{
      setRembtnDisabled(false)
    }
  };
  const handleOpen = (titletext) => {
    setModalTitle(titletext)
    setOpen(true);
    setValue("")
  }
  const handleClose = () => {
      setOpen(false)
      setRembtnDisabled(true)
  };

  const UpdateRestDB = async (User,updatetype) => {
    
    setError("");
    
    const UserData = filter(Data, ['User', User.toUpperCase()])
      //console.log(UserData.length)
      setOpen(false)
      setbdOpen(true);
      setStatus("progress")

      try {
        if (updatetype==='Add' && UserData.length===0){
            const body = {
              "User": User.toUpperCase(),
              "Date": null
            }

            let res = await restdb.post("/records", body);
            if(res.status >= 200 && res.status <= 299) {

              const newUser = {
                "_id": res.data._id ,
                "User": res.data.User ,
                "Date": null
              }
              
              let newState = Data
              newState.push(newUser)
              setData(orderBy(newState,[( o ) => { return o.Date || ''},'User'], ['desc', 'asc']))
            }
            
        } else if (updatetype==='Remove'){
          const id = UserData[0]._id
          let res = await restdb.delete(`/records/${id}`);
          if(res.status == 200){
            //console.log('removed')
            
            let x = Data
            setData(reject(x, {_id: id}))
          } 
        }
      } catch (error) {
        setError("Something went wrong!");
        return console.log(error);
      }
      setStatus("success")
      timerRef.current = window.setTimeout(() => {
        setbdOpen(false);
      }, 1000);
  };
  
  const handleOnClick = (obj) => {
    sessionStorage.setItem('User', obj); 
    setUserObj(obj);

    //console.log(dayjs(obj.Date).isSameOrAfter(dayjs().day(-6)));
    if (!dayjs(obj.Date).isBetween(dayjs().day(0).set('hour', 23).set('minute', 59).set('second', 59), dayjs().day(8).set('hour', 0).set('minute', 0).set('second', 1) )){
      navigate("/Boldface")
    }
    //console.log(sessionStorage.getItem('User'));
  }

  const usergrid = filter(Data, function(o) { return startsWith(o.User, q); }).map((obj, idx) => {

    var valid = (dayjs(obj.Date).isBetween(dayjs().day(0).set('hour', 23).set('minute', 59).set('second', 59), dayjs().day(8).set('hour', 0).set('minute', 0).set('second', 1) ))

    const PersButton = styled(Button)(({ theme }) => ({
      backgroundColor: valid? alpha(teal[700],0.5) : alpha(pink[800],0.5),
      ...theme.typography.body2,
      padding: theme.spacing(0),
      maxWidth: 400,
      width: '100%',
      position: 'relative',
      textAlign: 'center',
      'flex-direction': 'column',
      color: theme.palette.text.primary,
      "&:hover": {transform: 'scale(1.2)', backgroundColor: valid? alpha(teal[700],1) : alpha(pink[800],1) , 'z-index':'555555'}       
    }));

    return (<Grid key={idx} item xs={4} sm={3} md={2} lg={1} onClick={() => { handleOnClick(obj) }}>
            <PersButton
            name={obj.User}
            ref={(el) => (myRefs.current[idx] = el)}
            >
                <Typography variant="subtitle1">
                  {obj.User}
                </Typography>
                <Typography variant="subtitle2" color={grey[500]}>
                  {obj.Date === null? "-": dayjs(obj.Date).format('DD MMM YY')}
                </Typography>
            </PersButton>
          </Grid>)
    })

  return (
    <Container sx={{
      '& .MuiBackdrop-root': { position:"absolute", top:"3.5rem"}}} disableGutters={true} maxWidth="xl">
      <Backdrop
        sx={{ backgroundColor: alpha('#000000',0.8), color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={bdopen}
      >
         {status === 'success' ? (
          <Typography variant="h6">{value} {(ModalTitle==="Remove")? ' REMOVED' : ' ADDED'}</Typography>
        ) : (
          <Fade
            in={status === 'progress'}
            style={{
              transitionDelay: '0ms',
            }}
            unmountOnExit
          >
            <CircularProgress color="inherit" size={80}
        thickness={4}/>
          </Fade>
        )}

      </Backdrop>
    <Paper
    component="form"
    onSubmit={handleSubmit(SearchUser)}
    sx={{ p: '2px 4px', display: 'flex', "margin":"1rem 1rem 0 1rem", alignItems: 'center' }}
    >
      <Controller
      control={control}
      name="searchfield"
      defaultValue=""
      render={({ field }) => (
        <InputBase
        {...field}
        id="SearchUser"
        autoComplete="off"
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Users"
        value={q}
        onChange={(e) => setQ(e.target.value.toUpperCase())}
        />
      )}
      />
      <IconButton sx={{ p: '10px', color: grey[700] }} aria-label="search" onClick={handleSubmit(SearchUser)}>
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="button" onClick={() => { handleOpen("Add") }} sx={{
          color: grey[700],
          '&:hover': { backgroundColor: alpha(teal[900],0.5)}}} variant="outlined">
          <PersonAddOutlinedIcon />
        </IconButton>
        <IconButton type="button" onClick={() => { handleOpen("Remove") }} sx={{
          color: grey[700],
          '&:hover': { backgroundColor: alpha(pink[900],0.5)}}} variant="outlined">
          <PersonRemoveAlt1OutlinedIcon />
        </IconButton>
    </Paper>
    <Box sx={{ flexGrow: 1, "padding":"1rem", display: { xs: 'flex', md: 'flex' } }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        {usergrid}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box 
          sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {ModalTitle} User
            </Typography>
              {(ModalTitle==="Remove")? 
                <TextField
                sx={{
                margin:'1rem 0',
                '& label.Mui-focused': {
                color: alpha(teal['A400'],0.9),
                },
                '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: alpha(teal['A400'],0.9),
                },
                '&.Mui-focused fieldset': {
                  borderColor: alpha(teal['A400'],0.9),
                },
                }}}
                select
                fullWidth
                label= "Select User"
                inputRef={textfieldref}
                onChange={RemoveonChange}
              >
                {orderBy(Data, ['User'], ['asc']).map((obj) => (
                  <MenuItem key={obj.User} value={obj.User}>{obj.User}</MenuItem>
                ))}
              </TextField>
            : 
              <TextField
              sx={{
              margin:'1rem 0',
              '& label.Mui-focused': {
                color: alpha(teal['A400'],0.9),
              },
              '& label.Mui-error': {
                color: alpha(pink['A400'],0.9),
              },
              '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                borderColor: alpha(teal['A400'],0.9),
              },
              '&.Mui-focused fieldset': {
                borderColor: alpha(teal['A400'],0.9),
              },
              '&.Mui-error fieldset': {
                borderColor: alpha(pink['A400'],0.9),
                },
              }}}
              label={labelText}
              name="User"
              fullWidth
              autoFocus
              autoComplete="off"
              inputProps={{ style: { fontSize: "0.75rem"}}}
              error={errorText}
              inputRef={textfieldref}
              onChange={AddonChange}
              value={value}
              />
            }    
            <Button fullWidth 
              sx={{
              borderColor: "whitesmoke",
              color: "white",
              '&:hover': { backgroundColor: alpha(grey[300],0.5), borderColor: "whitesmoke"}}} 
              variant="outlined" 
              onClick={() => { UpdateRestDB(textfieldref.current.value, ModalTitle) }}
              disabled={(ModalTitle==="Remove")? RembtnDisabled : AddbtnDisabled }
              >Sumbit</Button>
          </Box>
        </Modal>       
      </Grid>      
    </Box>
    </Container>
  );
  }

export default Overview;