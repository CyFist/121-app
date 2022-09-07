import React, { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { restdb, realtimeURL } from "../utils/api_client";
import { useNavigate } from "react-router";
import { alpha, Box, Grid, ButtonGroup, Button, Typography, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import { teal, pink, grey } from "@mui/material/colors";
import { styled } from '@mui/material/styles';
import { filter } from "lodash";
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isoWeek from 'dayjs/plugin/isoWeek'
import localeData from 'dayjs/plugin/localeData'
dayjs.extend(localeData)
dayjs.extend(isSameOrAfter)
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
  const textfieldref = useRef()

  const handleOpen = (titletext) => {
    setModalTitle(titletext)
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  
  const objs = useRef(Data)

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
    if (!dayjs(obj.Date).isSameOrAfter(dayjs().day(0).set('hour', 23).set('minute', 59).set('second', 59))){
      
      navigate("/Boldface")
    }
    //console.log(sessionStorage.getItem('User'));
  }

    objs.current = Data.map((obj, idx) => {

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

  return (
    <>
    <Box sx={{ flexGrow: 1, "padding":"1rem", display: { xs: 'flex', md: 'flex' } }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 1, md: 1 }}>
        {objs.current}
        <Grid item xs={4} sm={3} md={2} lg={1} rowSpacing={1} >
        <ButtonGroup sx={{
              height: "3rem",
              borderColor: "whitesmoke",
              color: "white",
              width: '100%'}}
              variant="outlined" aria-label="outlined button group">
              <Button fullWidth onClick={() => { handleOpen("Add") }} sx={{
                borderColor: "whitesmoke",
                color: "white",
                '&:hover': { backgroundColor: alpha(teal[900],0.5), borderColor: "whitesmoke"}}} variant="outlined">
                <PersonAddOutlinedIcon />
              </Button>
              <Button fullWidth onClick={() => { handleOpen("Remove") }} sx={{
                borderColor: "whitesmoke",
                color: "white",
                '&:hover': { backgroundColor: alpha(pink[900],0.5), borderColor: "whitesmoke"}}} variant="outlined">
                <PersonRemoveAlt1OutlinedIcon />
              </Button>
        </ButtonGroup>
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
              <TextField
                  sx={{'& label.Mui-focused': {
                    color: alpha(teal['A400'],0.9),
                  },'& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: alpha(teal['A400'],0.9),
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: alpha(teal['A400'],0.9),
                      //backgroundColor: alpha(grey[100],0.2),
                    },}}}
                  select={(ModalTitle==="Remove")? true : false}
                  fullWidth
                  defaultValue=""
                  label={(ModalTitle==="Remove")? "Select User" : "User"}
                  inputProps={{ style: { textTransform: "uppercase" } }}
                  inputRef={textfieldref}
                >
                {(ModalTitle==="Remove")? 
                  Data.map((obj) => (
                    <MenuItem value={obj.User}>{obj.User}</MenuItem>
                  ))
                 : ""}
                 </TextField>
              <Button fullWidth sx={{margin:'1rem 0', 
                borderColor: "whitesmoke",
                color: "white",
                '&:hover': { backgroundColor: alpha(grey[300],0.5), borderColor: "whitesmoke"}}} variant="outlined" onClick={() => { UpdateRestDB(textfieldref.current.value, ModalTitle) }}>Sumbit</Button>
            </Box>
        </Modal>
        </Grid>        
      </Grid>      
    </Box>
    </>
  );
  }

export default Overview;