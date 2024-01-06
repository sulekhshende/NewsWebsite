import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { publicRequest, userRequest } from '../../../redux/requestMethod'


type propTypes={
  data:any;
  setUsers: any;
}


// prop:propTypes

export default function WaitingCard2( prop:propTypes) {
  const [approval, setApproval] = useState();
  const [rejection, setRejection] = useState();


  function aprrove(id:number){
    console.log(id)
    userRequest.post("/auth/approval/" + id).then((res)=> {
      console.log("here it is giving error")
        console.log(res.data);
        //setApproval(res.data);
        setWaitingReporter();
    })
  };


  function reject(id:number){
    console.log(id)
    userRequest.post("/auth/rejection/" + id).then((res)=> {
        console.log(res.data);
        //setRejection(res.data);
        console.log(res)
        if(res.statusText==='Created'){
          console.log("deleteing swh")
          userRequest.delete("/users/" +id).then((response) => {
            console.log(response);
            setWaitingReporter()
          });
        }
    })
  };

  const setWaitingReporter = async() => {
    try {
      const res = await userRequest.get("/users/")
      prop.setUsers(res.data);
    } catch (err) {
      console.log(err)
    }
    
  }

  return (

    <Card sx={{mb: 3,
      background: "#dad4d4",
      borderRadius: 4}}>
      <CardContent>
        <Grid container>

          <Grid item xs={12} sm={5} md={6} lg={6}>
            <Box sx={{minWidth:"fit-content"}}>
            <Typography variant='h6' sx={{fontSize:"26px"}}>{prop.data.username}</Typography>

            {/* testing */}
            <Typography >{prop.data.username}</Typography>
            </Box>
           
          </Grid>

          <Grid item xs={12} sm={7} md={6} lg={6}>
            <Box sx={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
              <Box mr={3}>
              <Button 
                variant="contained"
                onClick={()=> aprrove(prop.data.id)}
              >Approve
              </Button>
              </Box>
              <Box>
              <Button 
                variant="contained"
                onClick={()=> reject(prop.data.id)}
              >Reject
              </Button>
              </Box>
           
            </Box>
            
          </Grid>

        </Grid>
      </CardContent>
    </Card>
   
  )
}
