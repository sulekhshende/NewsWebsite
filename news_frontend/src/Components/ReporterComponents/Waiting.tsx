import { LineAxisOutlined } from '@mui/icons-material'
import { Box, Container } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { userRequest } from '../../redux/requestMethod'
import WaitingCard2 from "./waitingComponent/WaitingCard2"
import { publicRequest } from './../../redux/requestMethod';


export type dataType={
  id: number,
  username: string,
  email:string,
  emailToken:string,
  accessToken:string,
  isReporter:boolean,
  rep_approval:boolean,
}


export default function Waiting() {
  
  const [users, setUsers] = useState<dataType[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("/users/");
        setUsers(res.data);
        console.log("line 26 waiting " + JSON.stringify(res.data))
      } catch {}
    };
    getUsers();
  },[])

  return (

    <Container  maxWidth="lg" sx={{}}>
     <Container maxWidth="lg" sx={{pt:6}}>
       {users.map((user)=>{
         return <WaitingCard2 setUsers={setUsers}  data={user} key={user.id}/>
       })}
     </Container>
    </Container>
  )
}
