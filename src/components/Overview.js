import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { restdb } from "../utils/api_client";
import { useNavigate } from "react-router";
import { alpha, Box, Grid, Button, Typography, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { teal, pink, grey } from "@mui/material/colors";
import { styled } from '@mui/material/styles';
import { filter, orderBy, startsWith } from "lodash";
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

const Overview = ({ UserObj, setUserObj, Data }) => {

  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [Valid, setValid] = useState(false);
  const [open, setOpen] = useState(false);
  const [ModalTitle, setModalTitle] = useState("");
  const [labelText, setLabelText] = useState("User");
  
  const [UserGrid, setUserGrid] = useState([]);
  const [SearchData, setSearchData] = useState(Data);
  const [Searching, setSearching] = useState(false);

  const [errorText, setErrorText] = useState();
  const [AddbtnDisabled, setAddbtnDisabled] = useState(true);
  const [RembtnDisabled, setRembtnDisabled] = useState(true);
  const textfieldref = useRef()
  const Searchfieldref = useRef()
  const [value, setValue] = useState();
  
  const { control, handleSubmit, reset } = useForm({
    reValidateMode: "onBlur"
  });

  const AddonChange = (ev) => {
  
    setValue(ev.target.value);

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

  const SearchUser = (event) => {
    
    const Searchtxt = event.searchfield

    const SearchD = filter(Data, function(o) { return startsWith(o.User, Searchtxt.toUpperCase()); });

    setSearching(true)
    setSearchData(SearchD)

    //console.log(SearchData)

    const grids = SearchD.map((obj, idx) => {

      var bgclr = alpha(pink[400],0.4);
      var valid = (dayjs(obj.Date).isSameOrAfter(dayjs().day(0).set('hour', 23).set('minute', 59).set('second', 59)))
      
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

      return <Grid key={idx} item xs={4} sm={3} md={2} lg={1} onClick={() => { handleOnClick(obj) }}>
              <PersButton>
                  <Typography variant="subtitle1">
                    {obj.User}
                  </Typography>
                  <Typography variant="body2" color={grey[300]}>
                    {obj.Date === null? "-": dayjs(obj.Date).format('DD MMM YY')}
                  </Typography>
              </PersButton>
            </Grid>
    });

    setUserGrid(grids)

    //console.log(objs.current)

  };

  const RemoveonChange = (ev) => {

    console.log(ev.target.value)
    if (ev.target.value === ''){
      setRembtnDisabled(true)
    }else{
      setRembtnDisabled(false)
    }
  };

  const handleOpen = (titletext) => {
    setModalTitle(titletext)
    setOpen(true);
  }
  const handleClose = () => {
      setOpen(false)
      setRembtnDisabled(true)
    };
  
  const objs = useRef()

  const UpdateRestDB = async (User,updatetype) => {
    
    setError("");
    
    const UserData = filter(Data, ['User', User.toUpperCase()])
      console.log(UserData.length)
      try {
        if (updatetype==='Add'){
          if (UserData.length===0){
            const data = {
              "User": User.toUpperCase(),
              "Date": null
            }
            console.log('added')
            await restdb.post("/records", data);
          }
        } else if (updatetype==='Remove'){
          const id = UserData[0]._id
          console.log('removed')
          await restdb.delete(`/records/${id}`);
        }
      } catch (error) {
        setError("Something went wrong!");
        return console.log(error);
      }
      setOpen(false)
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

  objs.current =  Data.map((obj, idx) => {

    var bgclr = alpha(pink[400],0.4);
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

    return <Grid key={idx} item xs={4} sm={3} md={2} lg={1} onClick={() => { handleOnClick(obj) }}>
            <PersButton>
                <Typography variant="subtitle1">
                  {obj.User}
                </Typography>
                <Typography variant="body2" color={grey[300]}>
                  {obj.Date === null? "-": dayjs(obj.Date).format('DD MMM YY')}
                </Typography>
            </PersButton>
          </Grid>
  });
  //setUserGrid(grids)

  return (
    <>
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
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search For Users"
            inputProps={{ 'aria-label': 'search for users',style: { textTransform: "uppercase" } }}
          />
        )}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSubmit(SearchUser)}>
        <SearchIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="button" onClick={() => { handleOpen("Add") }} sx={{
          borderColor: "whitesmoke",
          color: "white",
          '&:hover': { backgroundColor: alpha(teal[900],0.5), borderColor: "whitesmoke"}}} variant="outlined">
          <PersonAddOutlinedIcon />
        </IconButton>
        <IconButton type="button" onClick={() => { handleOpen("Remove") }} sx={{
          borderColor: "whitesmoke",
          color: "white",
          '&:hover': { backgroundColor: alpha(pink[900],0.5), borderColor: "whitesmoke"}}} variant="outlined">
          <PersonRemoveAlt1OutlinedIcon />
        </IconButton>
    </Paper>
    
    <Box sx={{ flexGrow: 1, "padding":"1rem", display: { xs: 'flex', md: 'flex' } }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        {Searching? UserGrid : objs.current}
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
                  inputProps={{ style: { textTransform: "uppercase" } }}
                  inputRef={textfieldref}
                  onChange={RemoveonChange}
                >
                  {orderBy(Data, ['User'], ['asc']).map((obj) => (
                    <MenuItem value={obj.User}>{obj.User}</MenuItem>
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
                inputProps={{ style: { fontSize: "0.75rem", textTransform: "uppercase" }}}
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
    </>
  );
  }

export default Overview;