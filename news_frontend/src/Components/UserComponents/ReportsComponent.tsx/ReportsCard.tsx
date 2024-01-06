import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';


type ReportStateProps = {
  report: any;
  //news_id: number;
}




export default function ReportsCard({report}: ReportStateProps) {

  const navigate = useNavigate()

  function handleClick(report:any){

    navigate(`/viewnews/${report.id}`)

  }

  return (

    <Card sx={{mb: 3,
      background: "#dad4d4",
      borderRadius: 4}}>
      <CardContent>
        <Grid container sx={{justifyContent:"center"}}>

          <Grid item >
            <Box sx={{minWidth:"fit-content"}}>
            <Typography variant='h6' sx={{fontSize:"26px"}} onClick={()=>handleClick(report)}>{report.title}</Typography>
            </Box>
           
          </Grid>

          

        </Grid>
      </CardContent>
    </Card>
   
  )
}
