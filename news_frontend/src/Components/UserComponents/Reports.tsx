import { LineAxisOutlined } from '@mui/icons-material'
import { Box, Container } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { publicRequest, userRequest } from '../../redux/requestMethod'
import ReportsCard from './ReportsComponent.tsx/ReportsCard'

export type ReportType={
  id: number,
  name: string
}


export default function Reports() {
  
  const [reports,setReports]=useState([])


  useEffect(() => {
      getReports();
    }, [])


    const getReports = async () => {
      try {
        const res = await userRequest.get("/reportsnews/reportedNews");
        setReports(res.data)
      } catch {}
    }
      
  return (

    <Container  maxWidth="lg" sx={{}}>
     <Container maxWidth="lg" sx={{pt:6}}>
       {reports.map((report:any)=>{
         return <ReportsCard key={report.id} report={report}/>
       })}
     </Container>
    </Container>
  )
}
