
import { Backdrop, Box, Button, Card, CardContent, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { publicRequest, userRequest } from './../../redux/requestMethod';

// const initialState={
//     loc_name:""
// }

type dataType={
    id: number,
    rep_name:string
}

export default function Report() {
    
    const [data, setData]=useState<dataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [rep_name, setRep_name]=useState("");


    const loadData=async()=>{
        try {
            const response=await userRequest.get("/reports/");
            console.log(response.data);
            setData(response.data);
            setIsLoading(false);
        } catch(err) {
            console.log(err)
        }
        
    }

    useEffect(()=>{
        loadData();
    },[]);

    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setRep_name(e.target.value);

    }

    const handleSubmit=(e:FormEvent)=>{
        e.preventDefault();

        if(!rep_name){
            alert("please provide value into input field!")
        }else{
            userRequest.post( "/reports/",{
                rep_name
            }).then((response)=>{
                setRep_name("");
                console.log(response);

                if (response.statusText === "OK") {
                    loadData()
                }
            }).catch((err)=>{
                console.log("error : ", err)
            })
        }
    }


    const handleDelete=async(rep_id:number)=>{
        try {
            if(window.confirm("Are you sure you want to delete this Report?")){
                const response= await userRequest.delete("/reports/" + `${rep_id}`);
                if (response.statusText === "OK") {
                 loadData()
             }
             }
        } catch (error) {
            console.log(error)
        }
    }



    if (isLoading) {
        return (
            <>
                <div>
                    <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={isLoading}
                      
                    >
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </div>
            </>
        )
    }


    
    return (
        <div>
            <Grid container style={{}}>

                <Grid item xs={12} md={4} style={{}}>
                    <Box pt={3}>
                        <Container>
                            <Card sx={{ minWidth: 150, backgroundColor: "#dad4d4", borderRadius: 5 }}>
                                <CardContent sx={{ overflow: "auto" }}>
                                    <Box mt={1} mb={2} textAlign="center">
                                        <Typography variant="h5" component="div">
                                            List of Reports
                                        </Typography>
                                    </Box>
                                    <Box >
                                        {/* changes for mapping data */}

                                        {data.map((item)=>{
                                         return(
                                            <Box key={item.id} sx={{display:"flex", justifyContent:"space-around", backgroundColor:"white", borderRadius:4}} mb={1}
                                            >
                                                <Typography variant="h6" component="div" >
                                                   {item.rep_name}
                                                </Typography>
                                                <Box pt={0.4}>
                                                <Button  variant="contained" color="error" size="small" 
                                                style={{maxWidth: '55px', maxHeight: '20px', minWidth: '55px', minHeight: '20px'}}
                                                onClick={()=>handleDelete(item.id)}>Delete</Button>
                                                </Box>
                                               
                                            </Box>

                                         )
                                       
                                        })}
                                        {/* end changes */}
                                    </Box>

                                </CardContent>

                            </Card>

                        </Container>
                    </Box>

                </Grid>

                <Grid item xs={12} md={8} style={{
                    height: "90vh",
                }}>
                    <Box pt={3}>
                        <Container >
                            <Card sx={{ minWidth: 275, backgroundColor: "#dad4d4", borderRadius: 5 }}>
                                <CardContent>

                                    <Box component="form"
                                     sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
                                     pt={8}
                                     onSubmit={handleSubmit}
                                     >
                                        <Typography variant="h5" component="div">
                                            Add new Report
                                        </Typography>

                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="report"
                                            label="Report"
                                            name="rep_name"
                                            autoFocus
                                            onChange={handleChange}
                                        />

                                        <Button variant="contained" type="submit">Insert</Button>

                                    </Box>


                                </CardContent>

                            </Card>

                        </Container>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
