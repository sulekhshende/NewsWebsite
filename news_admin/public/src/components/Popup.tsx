import React, { useState } from 'react'
import Container  from '@mui/material/Container';
import Box from '@mui/material/Box';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography/Typography';
import { Modal } from '@mui/material';



const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


function Popup(props:any) {
    
  return (props.trigger) ? (
        <Modal
            open={props.trigger}
            onClose={props.trigger}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                <Typography gutterBottom>
                                You will Get Notification on your Registered Email from Admin About your Job Selection 
                                in Maximum 2 days. Thanks for Applying ! 
                </Typography>
                <Button onClick={() => props.setTrigger(false)}>close</Button>
            </Typography>
            </Box>
        </Modal>
      
  ) : null
}

export default Popup;
