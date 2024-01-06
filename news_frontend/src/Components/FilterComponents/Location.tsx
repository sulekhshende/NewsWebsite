import { Box, Button, Card, CardContent, Container, Grid, TextField, Typography,CircularProgress,Backdrop } from '@mui/material'
import axios from 'axios';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { publicRequest, userRequest } from '../../redux/requestMethod';

// const initialState={
//     loc_name:""
// }

type dataType = {
    createdAt: string;
    id: number;
    loc_name: string;
    updatedAt: string;
}

export default function Location() {
    const [data, setData] = useState<dataType[] >([]);
    const [loc_name, setLoc_name] = useState("");
    const [isLoading, setIsLoading] = useState(true);

  
    const loadData = () => {
        publicRequest.get("/locations/").then((response) => {
            console.log(response.data);
            setData(response.data);
            setIsLoading(false);
        })
    }


    useEffect(() => {
        loadData();
    }, []);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoc_name(e.target.value);
    }



    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!loc_name) {
            alert("please provide value into input field!")
        } else {
            userRequest.post("/locations/", {
                loc_name
            }).then((response) => {
                setLoc_name("");
                console.log(response);

                if (response.statusText === "OK") {
                    loadData()
                }

            }).catch((err) => {
                console.log("error : ", err)
            })
        }
        // setCount(count+1);
    }


    const handleDelete = async (id: number) => {
        if (window.confirm("Are you sure you want to delete this location?")) {
            const response = await userRequest.delete(`/locations/${id}`);
            if (response.statusText === "OK") {
                loadData()
            }
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
                                            List of Location
                                        </Typography>
                                    </Box>
                                    <Box >
                                        {/* changes for mapping data */}

                                        {data.map((item: any) => {
                                            return (
                                                <Box key={item.id} sx={{ display: "flex", justifyContent: "space-around", backgroundColor: "white", borderRadius: 4 }} mb={1}
                                                >
                                                    <Typography variant="h6" component="div" >
                                                        {item.loc_name}
                                                    </Typography>
                                                    <Box pt={0.4}>
                                                        <Button variant="contained" color="error" size="small"
                                                            style={{ maxWidth: '55px', maxHeight: '20px', minWidth: '55px', minHeight: '20px' }}
                                                            onClick={() => handleDelete(item.id)}>Delete</Button>
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
                                            Add new Location
                                        </Typography>

                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="location"
                                            label="Location"
                                            name="loc_name"
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


// import { Box, Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material'
// import axios from 'axios';
// import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
// import { publicRequest } from '../../redux/requestMethod';

// // const initialState={
// //     loc_name:""
// // }

// type dataType={
//     id: number,
//     loc_name:string
// }

// export default function Location() {
//     const [count, setCount]=useState(0);
//     const [data, setData]=useState<dataType[]>([]);

//     const [loc_name, setLoc_name]=useState("");

//     // const loadData=async()=>{
//     //     const response=await axios.get("http://localhost:7700/api/locations/");
//     //     console.log(response.data);
//     //     setData(response.data);
//     // }

//     const loadData= async ()=>{
//         try {
//             await publicRequest.get("/locations/").then((response)=>{
//                 console.log(response.data);
//                 setData(response.data);
//             })
//         } catch  {}
              
//     }


//     useEffect(()=>{
//         loadData();
//     },[count]);

//     const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
//         setLoc_name(e.target.value);

//     }

  

//     const handleSubmit=(e:FormEvent)=>{
//         e.preventDefault();

//         if(!loc_name){
//             alert("please provide value into input field!")
//         }else{
//             publicRequest.post("/locations/",{
//                 loc_name
//             }).then(()=>{
//                 setLoc_name("");
//             }).catch((err)=>{
//                 console.log("error : ", err)
//             })
//         }
//         setCount(count+1);
//     }


//     const handleDelete=(id:number)=>{
//         if(window.confirm("Are you sure you want to delete this location?")){
//             publicRequest.delete("/locations/" + `${id}`);
//             setTimeout(()=>{
//                 loadData();
//             }, 400);
//         }

//     }

//     return (
//         <div>
//             <Grid container style={{}}>

//                 <Grid item xs={12} md={4} style={{
//                     // border: "solid",
//                     //  minWidth: "100%",
//                     //   height: "90vh",
//                     // backgroundColor: 'lightBlue'
//                 }}>
//                     <Box pt={3}>
//                         <Container>
//                             <Card sx={{ minWidth: 150, backgroundColor: "#dad4d4", borderRadius: 5 }}>
//                                 <CardContent sx={{ overflow: "auto" }}>
//                                     <Box mt={1} mb={2} textAlign="center">
//                                         <Typography variant="h5" component="div">
//                                             List of Location
//                                         </Typography>
//                                     </Box>
//                                     <Box >
//                                         {/* changes for mapping data */}

//                                         {data.map((item)=>{
//                                          return(
//                                             <Box key={item.id} sx={{display:"flex", justifyContent:"space-around", backgroundColor:"white", borderRadius:4}} mb={1}
//                                             >
//                                                 <Typography variant="h6" component="div" >
//                                                    {item.loc_name}
//                                                 </Typography>
//                                                 <Box pt={0.4}>
//                                                 <Button  variant="contained" color="error" size="small" 
//                                                 style={{maxWidth: '55px', maxHeight: '20px', minWidth: '55px', minHeight: '20px'}}
//                                                 onClick={()=>handleDelete(item.id)}>Delete</Button>
//                                                 </Box>
                                               
//                                             </Box>

//                                          )
                                       
//                                         })}



//                                         {/* end changes */}
                                       

//                                     </Box>

//                                 </CardContent>

//                             </Card>

//                         </Container>
//                     </Box>

//                 </Grid>

//                 <Grid item xs={12} md={8} style={{
//                     // border: "solid",
//                     //  minWidth: "100%",
//                     height: "90vh",
//                     // backgroundColor: 'lightBlue'
//                 }}>
//                     <Box pt={3}>
//                         <Container >
//                             <Card sx={{ minWidth: 275, backgroundColor: "#dad4d4", borderRadius: 5 }}>
//                                 <CardContent>

//                                     <Box component="form"
//                                      sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
//                                      pt={8}
//                                      onSubmit={handleSubmit}
//                                      >
//                                         <Typography variant="h5" component="div">
//                                             Add new Location
//                                         </Typography>

//                                         <TextField
//                                             margin="normal"
//                                             // required
//                                             fullWidth
//                                             id="location"
//                                             label="Location"
//                                             name="loc_name"
//                                             autoFocus
//                                             onChange={handleChange}
//                                         />

//                                         <Button variant="contained" type="submit">Insert</Button>

//                                     </Box>


//                                 </CardContent>

//                             </Card>

//                         </Container>
//                     </Box>
//                 </Grid>
//             </Grid>
//         </div>
//     )
// }


// import { Box, Button, Card, CardContent, Container, Grid, TextField, Typography } from '@mui/material'
// import axios from 'axios';
// import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
// import { publicRequest } from './../../redux/requestMethod';

// // const initialState={
// //     loc_name:""
// // }

// type dataType={
//     id: number,
//     loc_name:string
// }

// export default function Location() {
//     const [count, setCount]=useState(0);
//     const [data, setData]=useState<dataType[]>([]);

//     const [loc_name, setLoc_name]=useState("");

//     const loadData=async()=>{
//         const response=await axios.get("http://localhost:7700/api/locations/");
//         //const response = await publicRequest.get("/locations/")
//         console.log(response.data);
//         setData(response.data);
//     }



//     useEffect(()=>{
//         loadData();
//     },[count]);

//     const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
//         setLoc_name(e.target.value);

//     }

  

//     const handleSubmit=(e:FormEvent)=>{
//         e.preventDefault();

//         if(!loc_name){
//             alert("please provide value into input field!")
//         }else{
//             axios.post( "http://localhost:7700/api/locations/",{
//                 loc_name
//             }).then(()=>{
//                 setLoc_name("");
//             }).catch((err)=>{
//                 console.log("error : ", err)
//             })
//         }
//         setCount(count+1);
//     }


//     const handleDelete=(id:number)=>{
//         if(window.confirm("Are you sure you want to delete this location?")){
//             axios.delete(`http://localhost:7700/api/locations/${id}`);
//             setTimeout(()=>{
//                 loadData();
//             }, 400);
//         }

//     }




















//     return (
//         <div>
//             <Grid container style={{}}>

//                 <Grid item xs={12} md={4} style={{
//                     // border: "solid",
//                     //  minWidth: "100%",
//                     //   height: "90vh",
//                     // backgroundColor: 'lightBlue'
//                 }}>
//                     <Box pt={3}>
//                         <Container>
//                             <Card sx={{ minWidth: 150, backgroundColor: "#dad4d4", borderRadius: 5 }}>
//                                 <CardContent sx={{ overflow: "auto" }}>
//                                     <Box mt={1} mb={2} textAlign="center">
//                                         <Typography variant="h5" component="div">
//                                             List of Location
//                                         </Typography>
//                                     </Box>
//                                     <Box >
//                                         {/* changes for mapping data */}

//                                         {data.map((item)=>{
//                                          return(
//                                             <Box key={item.id} sx={{display:"flex", justifyContent:"space-around", backgroundColor:"white", borderRadius:4}} mb={1}
//                                             >
//                                                 <Typography variant="h6" component="div" >
//                                                    {item.loc_name}
//                                                 </Typography>
//                                                 <Box pt={0.4}>
//                                                 <Button  variant="contained" color="error" size="small" 
//                                                 style={{maxWidth: '55px', maxHeight: '20px', minWidth: '55px', minHeight: '20px'}}
//                                                 onClick={()=>handleDelete(item.id)}>Delete</Button>
//                                                 </Box>
                                               
//                                             </Box>

//                                          )
                                       
//                                         })}



//                                         {/* end changes */}
                                       

//                                     </Box>

//                                 </CardContent>

//                             </Card>

//                         </Container>
//                     </Box>

//                 </Grid>

//                 <Grid item xs={12} md={8} style={{
//                     // border: "solid",
//                     //  minWidth: "100%",
//                     height: "90vh",
//                     // backgroundColor: 'lightBlue'
//                 }}>
//                     <Box pt={3}>
//                         <Container >
//                             <Card sx={{ minWidth: 275, backgroundColor: "#dad4d4", borderRadius: 5 }}>
//                                 <CardContent>

//                                     <Box component="form"
//                                      sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
//                                      pt={8}
//                                      onSubmit={handleSubmit}
//                                      >
//                                         <Typography variant="h5" component="div">
//                                             Add new Location
//                                         </Typography>

//                                         <TextField
//                                             margin="normal"
//                                             // required
//                                             fullWidth
//                                             id="location"
//                                             label="Location"
//                                             name="loc_name"
//                                             autoFocus
//                                             onChange={handleChange}
//                                         />

//                                         <Button variant="contained" type="submit">Insert</Button>

//                                     </Box>


//                                 </CardContent>

//                             </Card>

//                         </Container>
//                     </Box>
//                 </Grid>
//             </Grid>
//         </div>
//     )
// }
