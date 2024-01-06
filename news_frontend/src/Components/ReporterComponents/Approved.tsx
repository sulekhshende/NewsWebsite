import { LineAxisOutlined } from '@mui/icons-material'
import { Box, Container } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { publicRequest, userRequest } from '../../redux/requestMethod'
 
import ApprovedCard from './approvedComponent/ApprovedCard'
 
// export type dataType={
//   id: number,
//   name: string
// }
 
export default function Approved() {
  
  const [ approvedReporter, setApprovedReporter ] = useState<any>([])
 
  useEffect(()=>{
    userRequest.get("/approved/").then((res)=>{
      setApprovedReporter(res.data)
    })
  },[])
 
  return (
 
    <Container  maxWidth="lg" sx={{}}>
     <Container maxWidth="lg" sx={{pt:6}}>
       {approvedReporter.map((reporter:any)=>{
         return <ApprovedCard key={reporter.id} reporter={reporter} />
       })}
     </Container>
    </Container>
  )
}