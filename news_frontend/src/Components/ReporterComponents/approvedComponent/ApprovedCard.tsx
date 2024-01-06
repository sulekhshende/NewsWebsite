import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
 
type ApprovedReporterState = {
  reporter : any
}


export default function ApprovedCard({reporter}: ApprovedReporterState) {
  return (
 
    <Card sx={{mb: 3,
      background: "#dad4d4",
      borderRadius: 4}}>
      <CardContent>
        <Grid container sx={{justifyContent:"center"}}>
 
          <Grid item >
            <Box sx={{minWidth:"fit-content"}}>
            <Typography variant='h6' sx={{fontSize:"26px"}}>{reporter.username}</Typography>
            </Box>
           
          </Grid>
 
         
 
        </Grid>
      </CardContent>
    </Card>
   
  )
}