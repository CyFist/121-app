import React, { useState, useEffect, useRef } from "react";
import { restdb, realtimeURL } from "../utils/api_client";
import { useNavigate } from "react-router";
import { alpha, Box, Grid, ButtonGroup, Button, Typography, TextField } from '@mui/material';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import PersonRemoveAlt1OutlinedIcon from '@mui/icons-material/PersonRemoveAlt1Outlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import Tooltip from '@mui/material/Tooltip';
import { teal, pink, grey } from "@mui/material/colors";
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isoWeek from 'dayjs/plugin/isoWeek'
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
  const [User, setUser] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setUser(event.target.value);
  };


  const handleOpen = (titletext) => {
    setModalTitle(titletext)
    setOpen(true);
  }
  const handleClose = () => setOpen(false);
  
  const objs = useRef(Data)

  const postData = async () => {

    const data = {
      "User": 'XMOS',
      "Date": new Date().toISOString()
    }
      setError("");
      try {
        await restdb.post("/records", data);

      } catch (error) {
        setError("Something went wrong!");
        return console.log(error);
      }
  };


  
  const handleOnClick = (obj) => {
    sessionStorage.setItem('User', obj); 
    setUserObj(obj);
    if (!dayjs(obj.Date).isSameOrAfter(dayjs().day(-6))){
      navigate("/Boldface")
    }
    //console.log(sessionStorage.getItem('User'));
  }

    objs.current = Data.map((obj, idx) => {

      var bgclr = alpha(pink[400],0.4);
      var valid = (dayjs(obj.Date).isSameOrAfter(dayjs().day(-6)))
      
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
                    {dayjs(obj.Date).format('DD MMM YY')} 
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
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {ModalTitle} User
              </Typography>
              <TextField
                  select={(ModalTitle=="Remove")? true : false}
                  fullWidth
                  defaultValue=""
                  label={(ModalTitle=="Remove")? "Select User" : "User"}
                >
                {(ModalTitle=="Remove")? 
                  <><MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {Data.map((obj) => (
                    <MenuItem value={obj.User}>{obj.User}</MenuItem>
                  ))}</>
                 : ""}
                 </TextField>
              <Button fullWidth sx={{margin:'0.3rem 0', 
                borderColor: "whitesmoke",
                color: "white",
                '&:hover': { backgroundColor: alpha(grey[300],0.5), borderColor: "whitesmoke"}}}variant="outlined">Sumbit</Button>
            </Box>
        </Modal>
        </Grid>        
      </Grid>      
    </Box>
    </>
  );
  }

export default Overview;

//      <Button onClick={() => { putData();}}>put data</Button>
//<Button onClick={() => { postData();}}>post data</Button>